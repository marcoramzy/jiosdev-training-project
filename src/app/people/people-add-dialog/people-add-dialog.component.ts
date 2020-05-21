import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/components/format-datepicker/format-datepicker.component';

@Component({
  selector: 'app-people-add-dialog',
  templateUrl: './people-add-dialog.html',
  providers: [
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
  ]
})
export class PeopleAddDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  groupsList: GroupsData[] = [];
  editMode = false;

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
      groups: [data.groups],
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

}
