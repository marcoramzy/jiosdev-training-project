import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeopleService } from '../people.service';
@Component({
  selector: 'app-people-delete-dialog',
  templateUrl: './people-delete-dialog.html',
})
export class PeopleDeleteDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
      fb: FormBuilder,
      private peopleService: PeopleService,
      public dialogRef: MatDialogRef<PeopleDeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: number) {
        this.initForm(fb, data);
  }

  ngOnInit(): void {
    console.log('People Delete Dialog On Init');
  }


  initForm(fb: FormBuilder, data: number) {

    this.form = fb.group({
      id: [data],
    });
  }

  onDeleteClick() {
    const { value, valid } = this.form;
    if (valid) {
      this.peopleService.deletePerson(value.id);
      this.dialogRef.close(value);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
