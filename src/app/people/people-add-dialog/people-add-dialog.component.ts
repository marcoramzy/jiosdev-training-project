import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';

@Component({
  selector: 'app-people-add-dialog',
  templateUrl: './people-add-dialog.html',
})
export class PeopleAddDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;
  groupsList: GroupsData[] = [];

  constructor(fb: FormBuilder,
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

    getGroups(){
      this.groupsService.getGroups().then((value) => {
          this.groupsList = value;
      });
    }

    initForm(fb: FormBuilder, data: PeopleData){
      this.form = fb.group({
        firstName: [data.firstName, [Validators.required]],
        lastName: [data.lastName, [Validators.required]],
        mobile: [data.mobile],
        email: [data.email],
        birthDate: [data.birthDate],
        groups: [this.groupsList],
      });
    }

    onSaveClick() {
        this.formSubmitted = true;
        const {value, valid} = this.form;
        if (valid){
            console.log('people add form data', value);
            this.peopleService.addPerson(value);
            this.dialogRef.close(value);
        }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
