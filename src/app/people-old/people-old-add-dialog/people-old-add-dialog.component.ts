import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleOldService } from '../people-old.service';
import { GroupsService } from '../../groups/groups.service';

@Component({
  selector: 'app-people-old-add-dialog',
  templateUrl: './people-old-add-dialog.html',
})
export class PeopleOldAddDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  groupsList: GroupsData[] = [];
  editMode = false;

  constructor(
    fb: FormBuilder,
    private peopleOldService: PeopleOldService,
    private groupsService: GroupsService,
    public dialogRef: MatDialogRef<PeopleOldAddDialogComponent>,
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
        this.peopleOldService.addPerson(value);
      }
      else // Edit
      {
        this.peopleOldService.editPerson(value.id, value);
      }

      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
