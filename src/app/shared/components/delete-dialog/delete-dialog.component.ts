import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupsService } from '../../../groups/groups.service';
import { DeleteDialogData } from './delete-dialog-data';
import { PeopleService } from 'src/app/people/people.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.html',
})
export class DeleteDialogComponent implements OnInit {
  form: FormGroup;
  id: number;
  type: string;

  constructor(
      fb: FormBuilder,
      private groupsService: GroupsService,
      private peopleService: PeopleService,
      public dialogRef: MatDialogRef<DeleteDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {
        this.initDialog(data);
  }

  ngOnInit(): void {
    console.log('Delete Dialog On Init');
  }


  initDialog( data: DeleteDialogData) {
    this.id = data.id;
    this.type = data.type;
  }

  onDeleteClick() {

      if (this.type === 'people'){
        this.peopleService.deletePerson(this.id);
      }
      else if (this.type === 'groups'){
        this.groupsService.deleteGroup(this.id);
      }

      this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
