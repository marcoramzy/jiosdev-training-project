import { Component, OnInit, OnDestroy } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupsData } from 'src/app/shared/models/groups-data';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-groups-add-dialog',
  templateUrl: './groups-add-dialog.html',
})
export class GroupsAddDialogComponent implements OnInit {
  form: FormGroup;
  formSubmitted = false;

  constructor(
      fb: FormBuilder,
      private groupsService: GroupsService,
      public dialogRef: MatDialogRef<GroupsAddDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: GroupsData) {

      this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Group Add Dialog On Init');
  }


  initForm(fb: FormBuilder, data: GroupsData) {
    this.form = fb.group({
      name: [data.name, [Validators.required]],
      leader: [data.leader_id],
      count: [],
      description: [data.description],
    });
  }

  onSaveClick() {
    this.formSubmitted = true;
    const { value, valid } = this.form;
    if (valid) {
      this.groupsService.addGroup(value);
      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
