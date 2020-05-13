import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { PeopleData } from 'src/app/shared/people-data';
import { PeopleService } from '../people.service';

@Component({
  selector: 'people-add-dialog',
  templateUrl: './people-add-dialog.html',
})
export class PeopleAddDialog implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;

  ngOnInit(): void {
    console.log("Company Dialog On Init");
  }

  constructor(fb: FormBuilder,
    private peopleService: PeopleService,
    public dialogRef: MatDialogRef<PeopleAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {

    this.form = fb.group({
      firstName: [data.firstName, [Validators.required]],
      lastName: [data.lastName, [Validators.required]],
      mobile: [data.mobile],
      email: [data.email],
      birthDate: [data.birthDate],
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
