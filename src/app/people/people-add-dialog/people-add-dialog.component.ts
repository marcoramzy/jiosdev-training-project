import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { PeopleData } from 'src/app/shared/people-data';
// import {CompanyData} from "../../shared/company-data";
// import { CompanyService } from 'src/app/company/company.service';

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
    // private companyService: CompanyService,
    public dialogRef: MatDialogRef<PeopleAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {

    this.form = fb.group({
      id: [data.id, [Validators.required,Validators.min(0)]],
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
            // this.companyService.saveCompanyToLocalStorage(value);
            this.dialogRef.close(value);
        }      
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

}