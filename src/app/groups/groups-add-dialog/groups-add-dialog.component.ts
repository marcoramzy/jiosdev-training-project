import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { GroupsService } from '../groups.service';
import { PeopleService } from 'src/app/people/people.service';
import { PeopleData } from 'src/app/shared/models/people-data';


@Component({
  selector: 'app-groups-add-dialog',
  templateUrl: './groups-add-dialog.html',
})
export class GroupsAddDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  peopleList: PeopleData[] = [];
  editMode = false;

  constructor(
      private fb: FormBuilder,
      private groupsService: GroupsService,
      private peopleService: PeopleService,
      private dialogRef: MatDialogRef<GroupsAddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: GroupsData) {

      this.getPeople();
      this.initForm();
  }

  ngOnInit(): void {
    console.log('Group Add Dialog On Init');
  }


  initForm() {
    if (this.data.id !== undefined){
      this.editMode = true;
    }
    this.form = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, [Validators.required]],
      leader_id: [this.data.leader_id],
      description: [this.data.description],
    });
  }

  getPeople(){
    this.peopleService.getPeople().subscribe((value) => {
        this.peopleList = value;
    });
  }

  onSaveClick() {
    this.formSubmitted = true;
    const { value, valid } = this.form;
    if (valid) {
      if (this.editMode === false) // Add
      {
        this.groupsService.addGroup(value);
      }
      else // Edit
      {
        this.groupsService.editGroup( value.id , value);
      }
      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
