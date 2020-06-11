import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';
import { UrlsConstants } from 'src/app/shared/constants/urls.constants';


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
  defaultImageSrc = UrlsConstants.defaultImageSrc;
  imageSource;
  defaultImage = true;
  PhotoFile = null;
  originalPhotoPath = null;

  @ViewChild('imageInput') myInputVariable: ElementRef;


  constructor(
    fb: FormBuilder,
    private peopleService: PeopleService,
    private groupsService: GroupsService,
    public dialogRef: MatDialogRef<PeopleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {

    this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Company Dialog On Init');
  }

  initForm(fb: FormBuilder, data: PeopleData) {
    this.imageSource = this.defaultImageSrc;
    if (data.Id !== undefined) {
      this.editMode = true;

      this.peopleService.getPeopleById(data.Id).subscribe((res) => {
        if (res.PhotoPath != null){
          this.originalPhotoPath = res.PhotoPath;
          this.imageSource = res.PhotoPath;
        }
        this.setupForm(fb, res);
      });
    }

    this.setupForm(fb, data);

  }

  setupForm(fb, data){
    this.form = fb.group({
      Id: [data.Id],
      Name: fb.group({
        FirstName: [data.Name.FirstName, [Validators.required]],
        SecondName: [data.Name.SecondName, [Validators.required]]
      }),
      Mobile: [data.Mobile],
      Email: [data.Email],
      Birthdate: [data.Birthdate],
      PhotoFile: [data.PhotoFile],
      Gender: [data.Gender],
    });
  }

  onSaveClick() {
    this.formSubmitted = true;
    const { value, valid } = this.form;
    if (valid) {
      if (this.PhotoFile !== null) {
        value.PhotoFile = this.PhotoFile;
      }
      if (value.Id === null) {
        value.Id = 0;
      }
      if (this.originalPhotoPath != null){
        value.PhotoPath = this.originalPhotoPath;
      }
      if (value.Gender == null){
        value.Gender = 3;
      }

      if (this.editMode === false) // Add
      {
        console.log('people add form data', value);
        this.peopleService.addPerson(value);
      }
      else // Edit
      {
        this.peopleService.editPerson(value.Id, value);
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
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) // Validation on type
    {
      const reader = new FileReader();


      reader.addEventListener('load', (event: any) => {

        this.selectedFile = new FileSnippet(event.target.result, file);
        this.selectedFile.src = event.target.result;
        this.selectedFile.pending = true;
        this.imageSource = this.selectedFile.src;
        this.defaultImage = false;
        this.PhotoFile = event.target.result;

      });

      reader.readAsDataURL(file);
    }
    else {
      console.log('Unsupported File Type. Only jpeg and png is allowed!', 'Error!');
    }
  }

  deleteImage() {
    this.defaultImage = true;
    this.imageSource = this.defaultImageSrc;
    this.myInputVariable.nativeElement.value = '';
    this.PhotoFile = null;
  }

}
