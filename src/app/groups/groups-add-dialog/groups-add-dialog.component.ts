import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { GroupsService } from '../groups.service';
import { PeopleService } from 'src/app/people/people.service';
import { PeopleData } from 'src/app/shared/models/people-data';

import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (isSubmitted)); // control.dirty || control.touched ||
  }
}

@Component({
  selector: 'app-groups-add-dialog',
  templateUrl: './groups-add-dialog.html',
})
export class GroupsAddDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  peopleList: PeopleData[] = [];
  editMode = false;
  matcher = new MyErrorStateMatcher();

  constructor(
      fb: FormBuilder,
      private groupsService: GroupsService,
      private peopleService: PeopleService,
      public dialogRef: MatDialogRef<GroupsAddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: GroupsData) {

      this.getPeople();
      this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Group Add Dialog On Init');
  }


  initForm(fb: FormBuilder, data: GroupsData) {
    if (data.id !== undefined){
      this.editMode = true;
    }
    this.form = fb.group({
      id: [data.id],
      name: [data.name, [Validators.required]],
      leader_id: [data.leader_id],
      description: [data.description],
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
