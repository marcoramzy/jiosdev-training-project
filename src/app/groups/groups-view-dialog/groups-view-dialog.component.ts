import { Component, OnInit, TemplateRef } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from 'src/app/people/people.service';
import { PeopleData } from 'src/app/shared/models/people-data';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ComponentType } from '@angular/cdk/portal';
import { GroupsAddDialogComponent } from '../groups-add-dialog/groups-add-dialog.component';

@Component({
  selector: 'app-groups-view-dialog',
  templateUrl: './groups-view-dialog.html',
})
export class GroupsViewDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  peopleList: PeopleData[] = [];
  groupsData: GroupsData = {} as GroupsData;
  groupName: string;


  constructor(
    fb: FormBuilder,
    private dialogService: DialogService,
    private peopleService: PeopleService,
    public dialogRef: MatDialogRef<GroupsViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupsData) {

    this.getPeople();
    this.initData(fb, data);
  }

  ngOnInit(): void {
    console.log('Group View Dialog On Init');
  }


  initData(fb: FormBuilder, data: GroupsData) {
    this.groupName = data.name;
    this.groupsData =  data;
  }

  getPeople() {
    this.peopleService.getPeople().subscribe((value) => {
      this.peopleList = value;
    });
  }

  openDialog(dialogComponent: ComponentType<any> | TemplateRef<any>): void {
    this.dialogService.openDialog(dialogComponent, {
      id: this.groupsData?.id,
      name: this.groupsData?.name,
      leader_id: this.groupsData?.leader_id,
      description: this.groupsData?.description
    }, { size: 'md' }, true);

  }


  onEditClick() {
      this.openDialog(GroupsAddDialogComponent);
      this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
