import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';

class FileSnippet {
  static readonly IMAGE_SIZE = { width: 950, height: 720 };

  pending = false;
  status = 'INIT';

  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-people-add-dialog',
  templateUrl: './people-add-dialog.html',
  styleUrls: ['./people-add-dialog.component.scss']

})
export class PeopleAddDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  groupsList: GroupsData[] = [];
  editMode = false;
  selectedFile: FileSnippet;
  defaultImageSrc = 'https://stage.chmeetings.com/assets/images/Unknown.png';
  imageSource;
  defaultImage = true;

  @ViewChild('imageInput')
  myInputVariable: ElementRef;


  constructor(
    fb: FormBuilder,
    private peopleService: PeopleService,
    private groupsService: GroupsService,
    public dialogRef: MatDialogRef<PeopleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {

    this.getGroups();
    this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Company Dialog On Init');
    this.imageSource = this.defaultImageSrc;
  }

  getGroups() {
    this.groupsService.getGroups().subscribe((value) => {
      this.groupsList = value;
    });
  }

  initForm(fb: FormBuilder, data: PeopleData) {
    if (data.id !== undefined) {
      this.editMode = true;
    }
    this.form = fb.group({
      id: [data.id],
      firstName: [data.firstName, [Validators.required]],
      lastName: [data.lastName, [Validators.required]],
      mobile: [data.mobile],
      email: [data.email],
      birthDate: [data.birthDate],
      photo: [data.photo],
      gender: [data.gender],
    });

  }

  onSaveClick() {
    this.formSubmitted = true;
    const { value, valid } = this.form;
    if (valid) {
      if (value.groups == null){
        value.groups = [];
      }
      if (this.editMode === false) // Add
      {
        console.log('people add form data', value);
        this.peopleService.addPerson(value);
      }
      else // Edit
      {
        this.peopleService.editPerson(value.id, value);
      }

      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  processFile(imageInput: any) {
    console.log('imageInput', imageInput);
    this.selectedFile = undefined;

    const file = imageInput.files[0];
    console.log('file', file);
    if ( file && (file.type === 'image/png' || file.type === 'image/jpeg')) // Validation on type
    {
        const reader = new FileReader();


        reader.addEventListener('load', (event: any) => {
          console.log('event2.target.result', event.target.result);

          this.selectedFile = new FileSnippet(event.target.result, file);
          this.selectedFile.src = event.target.result;
          this.selectedFile.pending = true;
          this.imageSource = this.selectedFile.src;
          this.defaultImage = false;
        });

        reader.readAsDataURL(file);
      }
      else {
        console.log('Unsupported File Type. Only jpeg and png is allowed!', 'Error!');
      }
  }

  deleteImage(){
    // this.selectedFile = undefined;
    this.defaultImage = true;
    this.imageSource = this.defaultImageSrc;
    this.myInputVariable.nativeElement.value = '';
  }

}
