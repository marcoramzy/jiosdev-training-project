import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-people-view-dialog',
  templateUrl: './people-view-dialog.html',
})
export class PeopleViewDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  groupsList: GroupsData[] = [];
  peopleData: PeopleData = {} as PeopleData;
  personName: string;
  fromGroupsPage = false;
  groupsExists = false;


  constructor(
    fb: FormBuilder,
    public dialogService: DialogService,
    private peopleService: PeopleService,
    private groupsService: GroupsService,
    public dialogRef: MatDialogRef<PeopleViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {

    this.getGroups();
    this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Company Dialog On Init');
  }

  getGroups() {
    this.groupsService.getGroups().then((value) => {
      this.groupsList = value;
    });
  }

  initForm(fb: FormBuilder, data: PeopleData | any) {

    if (data.id !== undefined) {
      this.fromGroupsPage = true;
    }

    if (this.fromGroupsPage){
        this.personName = data.firstName + ' ' + data.lastName;
        this.peopleData = data;

        if (data.groups === [] || data.groups === undefined || data.groups === null || data.groups.length === 0){
          this.groupsExists = false;
        }
        else{
          this.groupsExists = true;
        }

        this.form = fb.group({
          id: [data.id],
          firstName: [data.firstName],
          lastName: [data.lastName],
          mobile: [{value: data.mobile, disabled: true}],
          email: [{value: data.email, disabled: true}],
          birthDate: [{value: data.birthDate, disabled: true}],
          groups: [{value: data.groups, disabled: true}],
        });
    }
    else{
        this.form = fb.group({
          id: [],
          firstName: [],
          lastName: [],
          mobile: [{value: '', disabled: true}],
          email: [{value: '', disabled: true}],
          birthDate: [{value: '', disabled: true}],
          groups: [{value: [], disabled: true}],
        });
        this.peopleService.getPeopleById(data.leader_id).then((res) => {
            this.personName = res.firstName + ' ' + res.lastName;
            this.peopleData = res;

            if (res.groups === [] || res.groups === undefined || res.groups === null || res.groups.length === 0){
              this.groupsExists = false;
            }
            else{
              this.groupsExists = true;
            }

            this.form = fb.group({
              id: [res.id],
              firstName: [res.firstName],
              lastName: [res.lastName],
              mobile: [{value: res.mobile, disabled: true}],
              email: [{value: res.email, disabled: true}],
              birthDate: [{value: res.birthDate, disabled: true}],
              groups: [{value: res.groups, disabled: true}],
            });
        });
    }

  }

  openDialog(dialogName: string, fromGroupsPage: boolean): void {
    this.dialogService.openDialog(dialogName, {id: this.peopleData.id, firstName: this.peopleData.firstName
      , lastName: this.peopleData.lastName, mobile: this.peopleData.mobile, email: this.peopleData.email
      , birthDate: this.peopleData.birthDate, groups: this.peopleData.groups}, {size: 'md' }, true, fromGroupsPage);
  }

  onEditClick() {
    this.formSubmitted = true;
    const { value, valid } = this.form;
    if (valid) {
        this.openDialog('people' , false);
        this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
