import {Component, OnInit} from '@angular/core';
import { DialogService } from '../shared/services/dialog.service';
import { PeopleData } from '../shared/models/people-data';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  isPeoplePage = true;
  peopleData: PeopleData = {} as PeopleData;

  constructor( public dialogService: DialogService) {
  }
  openDialog(editMode: boolean): void {
    this.dialogService.openDialog('people', {id: this.peopleData.id, firstName: this.peopleData.firstName
      , lastName: this.peopleData.lastName, mobile: this.peopleData.mobile, email: this.peopleData.email
      , birthDate: this.peopleData.birthDate}, {size: 'md' }, true, editMode);
  }

  ngOnInit() {
  }

}
