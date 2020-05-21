import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogData } from './delete-dialog-data';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.html',
})
export class DeleteDialogComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<DeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    console.log('Delete Dialog On Init');
  }


  onDeleteClick() {
      this.dialogRef.close({isDeleted: true});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
