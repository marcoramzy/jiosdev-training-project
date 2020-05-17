import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { PeopleData } from 'src/app/shared/people-data';
import { GroupsData } from 'src/app/shared/groups-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';

@Component({
  selector: 'people-add-dialog',
  templateUrl: './people-add-dialog.html',
})
export class PeopleAddDialog implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;
  groupsList : GroupsData[] =[];


  ngOnInit(): void {
    console.log("Company Dialog On Init");
  }

  constructor(fb: FormBuilder,
    private peopleService: PeopleService,
    private groupsService: GroupsService,
    public dialogRef: MatDialogRef<PeopleAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {

    this.groupsService.getGroups().then((value) => {
        this.groupsList=value;
    });

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
        if(valid){
            console.log("people add form data",value)
            this.peopleService.addPerson(value);
            this.dialogRef.close(value);
        }      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}
