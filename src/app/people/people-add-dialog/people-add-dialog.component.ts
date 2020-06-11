import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { PeopleService } from '../people.service';
import { FileSnippet } from 'src/app/shared/classes/file-snippet';
import { AppPeopleAddDialogModel } from './people-add-dialog.model';

@Component({
  selector: 'app-people-add-dialog',
  templateUrl: './people-add-dialog.html',
  styleUrls: ['./people-add-dialog.component.scss']

})
export class PeopleAddDialogComponent implements OnInit {
  // form: FormGroup;
  // formSubmitted = false;
  // groupsList: GroupsData[] = [];
  // editMode = false;
  // selectedFile: FileSnippet;
  // defaultImageSrc = UrlsConstants.defaultImageSrc;
  // imageSource;
  // defaultImage = true;
  // PhotoFile = null;
  // originalPhotoPath = null;

  model: AppPeopleAddDialogModel;

  @ViewChild('imageInput') myInputVariable: ElementRef;


  constructor(
    fb: FormBuilder,
    private peopleService: PeopleService,
    public dialogRef: MatDialogRef<PeopleAddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {
      this.initModel();
      this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Company Dialog On Init');
  }

  initForm(fb: FormBuilder, data: PeopleData) {
    this.model.imageSource = this.model.defaultImageSrc;
    if (data.Id !== undefined) {
      this.model.editMode = true;

      this.peopleService.getPeopleById(data.Id).subscribe((res) => {
        if (res.PhotoPath != null){
          this.model.originalPhotoPath = res.PhotoPath;
          this.model.imageSource = res.PhotoPath;
        }
        this.setupForm(fb, res);
      });
    }

    this.setupForm(fb, data);

  }

  setupForm(fb, data){
    this.model.form = fb.group({
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
    this.model.formSubmitted = true;
    // let { value, valid } = this.model.form;
    let { value, valid } = this.model.form;
    if (valid) {

      value = this.setDefaultValues(value);

      if (this.model.editMode === false) // Add
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

  setDefaultValues(value: PeopleData){
    if (this.model.PhotoFile !== null) {
      value.PhotoFile = this.model.PhotoFile;
    }
    if (value.Id === null) {
      value.Id = 0;
    }
    if (this.model.originalPhotoPath != null){
      value.PhotoPath = this.model.originalPhotoPath;
    }
    if (value.Gender == null){
      value.Gender = '3';
    }
    return value;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  processFile(imageInput: any) {
    console.log('imageInput', imageInput);
    this.model.selectedFile = undefined;

    const file = imageInput.files[0];
    console.log('file', file);
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) // Validation on type
    {
      const reader = new FileReader();


      reader.addEventListener('load', (event: any) => {

        this.model.selectedFile = new FileSnippet(event.target.result, file);
        this.model.selectedFile.src = event.target.result;
        this.model.selectedFile.pending = true;
        this.model.imageSource = this.model.selectedFile.src;
        this.model.defaultImage = false;
        this.model.PhotoFile = event.target.result;

      });

      reader.readAsDataURL(file);
    }
    else {
      console.log('Unsupported File Type. Only jpeg and png is allowed!', 'Error!');
    }
  }

  deleteImage() {
    this.model.defaultImage = true;
    this.model.imageSource = this.model.defaultImageSrc;
    this.myInputVariable.nativeElement.value = '';
    this.model.PhotoFile = null;
  }

  private initModel() {
    this.model = new AppPeopleAddDialogModel();
  }

}
