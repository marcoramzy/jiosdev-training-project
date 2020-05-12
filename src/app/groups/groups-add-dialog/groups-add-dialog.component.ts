import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { GroupsData } from 'src/app/shared/groups-data';
// import {CompanyData} from "../../shared/company-data";
// import { CompanyService } from 'src/app/company/company.service';

@Component({
  selector: 'groups-add-dialog',
  templateUrl: './groups-add-dialog.html',
})
export class GroupsAddDialog implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;

  ngOnInit(): void {
    console.log("Company Dialog On Init");
  }

  constructor(fb: FormBuilder,
    // private companyService: CompanyService,
    public dialogRef: MatDialogRef<GroupsAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GroupsData) {

    this.form = fb.group({
      id: [data.id, [Validators.required,Validators.min(0)]],
      name: [data.name, [Validators.required]],
      leader: [data.leader],
      description: [data.description],
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
