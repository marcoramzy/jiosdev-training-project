import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { GroupsData } from 'src/app/shared/groups-data';

@Component({
  selector: 'groups-add-dialog',
  templateUrl: './groups-add-dialog.html',
})
export class GroupsAddDialog implements OnInit {
  form: FormGroup;
  formSubmitted: boolean = false;

  ngOnInit(): void {
    console.log("Group Add Dialog On Init");
  }

  constructor(fb: FormBuilder,
    // private companyService: CompanyService,
    public dialogRef: MatDialogRef<GroupsAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: GroupsData) {

    this.form = fb.group({
      id: [data.id, [Validators.required,Validators.min(0)]],
      name: [data.name, [Validators.required]],
      leader: [data.leader],
      count: [data.count],
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
