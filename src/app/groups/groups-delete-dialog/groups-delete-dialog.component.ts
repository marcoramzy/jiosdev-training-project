import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupsService } from '../groups.service';
@Component({
  selector: 'app-groups-delete-dialog',
  templateUrl: './groups-delete-dialog.html',
})
export class GroupsDeleteDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
      fb: FormBuilder,
      private groupsService: GroupsService,
      public dialogRef: MatDialogRef<GroupsDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: number) {
        this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('Group Delete Dialog On Init');
  }


  initForm(fb: FormBuilder, data: number) {

    this.form = fb.group({
      id: [data],
    });
  }

  onDeleteClick() {
    const { value, valid } = this.form;
    if (valid) {
      this.groupsService.deleteGroup(value.id);
      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
