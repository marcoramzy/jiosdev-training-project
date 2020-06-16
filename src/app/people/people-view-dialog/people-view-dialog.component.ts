import { Component, OnInit, TemplateRef } from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PeopleData } from 'src/app/shared/models/people-data';
import { PeopleService } from '../people.service';
import { GroupsService } from '../../groups/groups.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ComponentType } from '@angular/cdk/portal';
import { PeopleAddDialogComponent } from '../people-add-dialog/people-add-dialog.component';
import { AppPeopleViewDialogModel } from './people-view-dialog.model';

@Component({
  selector: 'app-people-view-dialog',
  templateUrl: './people-view-dialog.html',
})
export class PeopleViewDialogComponent implements OnInit {

  model: AppPeopleViewDialogModel;

  constructor(
    fb: FormBuilder,
    public dialogService: DialogService,
    private peopleService: PeopleService,
    private groupsService: GroupsService,
    public dialogRef: MatDialogRef<PeopleViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PeopleData) {
      this.initModel();
      this.initData(data);
  }

  ngOnInit(): void {
    console.log('Groups View Dialog On Init');
  }

  initData(data: PeopleData | any) {

    this.getPersonId(data);
    this.peopleService.getPeopleById(this.model.personId).subscribe((res) => {
      this.model.personName = res.FullName;
      this.model.peopleData = res;
    });

  }

  openDialog(dialogComponent: ComponentType<any> | TemplateRef<any>): void {
    this.dialogService.openDialog(dialogComponent, {
      Id: this.model.peopleData.Id,
      Name: {FirstName: this.model.peopleData?.Name?.FirstName, SecondName: this.model.peopleData?.Name?.SecondName},
      Mobile: this.model.peopleData.Mobile, Email: this.model.peopleData.Email
      , Birthdate: this.model.peopleData.Birthdate, PhotoFile: this.model.peopleData.PhotoFile, Gender: this.model.peopleData.Gender,
    }, { size: 'md' }, true);
  }

  getPersonId(data: PeopleData | any){
    if (data.Id !== undefined) {
      this.model.personId = data.Id;
    }
    else if (data.leader_id !== undefined) {
      this.model.personId = data.leader_id;
    }
  }

  onEditClick() {
      this.openDialog(PeopleAddDialogComponent);
      this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private initModel() {
    this.model = new AppPeopleViewDialogModel();
  }

}
