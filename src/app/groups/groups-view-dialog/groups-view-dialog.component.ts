import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from 'src/app/people/people.service';
import { PeopleData } from 'src/app/shared/models/people-data';
import { DialogService } from 'src/app/shared/services/dialog.service';

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
  leaderExists = false;


  constructor(
    fb: FormBuilder,
    private dialogService: DialogService,
    private peopleService: PeopleService,
    public dialogRef: MatDialogRef<GroupsViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: GroupsData) {

    this.getPeople();
    this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Group Add Dialog On Init');
  }


  initForm(fb: FormBuilder, data: GroupsData) {
    this.groupName = data.name;
    this.groupsData =  data;
    if (data.leader_id !== null && data.leader_id !== undefined && data.leader_id.toString() !== '') {
      this.leaderExists = true;
    }
    this.form = fb.group({
      id: [data.id],
      name: [{ value: data.name, disabled: true }, [Validators.required]],
      leader_id: [{ value: data.leader_id, disabled: true }],
      description: [{ value: data.description, disabled: true }],
    });
  }

  getPeople() {
    this.peopleService.getPeople().subscribe((value) => {
      this.peopleList = value;
    });
  }

  openDialog(dialogName: string): void {
    this.dialogService.openDialog(dialogName, {
      id: this.groupsData?.id,
      name: this.groupsData?.name,
      leader_id: this.groupsData?.leader_id,
      description: this.groupsData?.description
    }, { size: 'md' }, true);

  }


  onEditClick() {
    this.formSubmitted = true;
    const { value, valid } = this.form;
    if (valid) {
      this.openDialog('groups');
      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
