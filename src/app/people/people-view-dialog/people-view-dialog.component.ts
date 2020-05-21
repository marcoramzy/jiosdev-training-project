import { Component, OnInit, TemplateRef } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ComponentType } from '@angular/cdk/portal';
import { PeopleAddDialogComponent } from '../people-add-dialog/people-add-dialog.component';

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
  personId: number;


  constructor(
    fb: FormBuilder,
    public dialogService: DialogService,
    private peopleService: PeopleService,
    private groupsService: GroupsService,
    public dialogRef: MatDialogRef<PeopleViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {

    this.getGroups();
    this.initData(fb, data);
  }

  ngOnInit(): void {
    console.log('Groups View Dialog On Init');
  }

  getGroups() {
    this.groupsService.getGroups().subscribe((value) => {
      this.groupsList = value;
    });
  }

  initData(fb: FormBuilder, data: PeopleData | any) {

    this.getPersonId(data);
    this.peopleService.getPeopleById(this.personId).subscribe((res) => {
      this.personName = res.firstName + ' ' + res.lastName;
      this.peopleData = res;
      this.checkGroupsExistance(res.groups);

    });

  }

  openDialog(dialogComponent: ComponentType<any> | TemplateRef<any>): void {
    this.dialogService.openDialog(dialogComponent, {
      id: this.peopleData.id, firstName: this.peopleData.firstName
      , lastName: this.peopleData.lastName, mobile: this.peopleData.mobile, email: this.peopleData.email
      , birthDate: this.peopleData.birthDate, groups: this.peopleData.groups
    }, { size: 'md' }, true);
  }

  getPersonId(data: PeopleData | any){
    if (data.id !== undefined) {
      this.personId = data.id;
    }
    else if (data.leader_id !== undefined) {
      this.personId = data.leader_id;
    }
  }

  checkGroupsExistance(groups: number[]){
    if (groups === [] || groups === undefined || groups === null || groups.length === 0) {
      this.groupsExists = false;
    }
    else {
      this.groupsExists = true;
    }
  }

  onEditClick() {
      this.openDialog(PeopleAddDialogComponent);
      this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
