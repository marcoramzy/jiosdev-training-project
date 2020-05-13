import {Component, OnInit} from '@angular/core';
import { DialogService } from '../shared/dialog.service';
import { PeopleData } from '../shared/people-data';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  isPeoplePage: Boolean = true;
  peopleData:PeopleData={} as PeopleData;

  constructor( public dialogService: DialogService) {
  }
  
  openDialog(): void {
    this.dialogService.openPeopleDialog({id: this.peopleData.id,firstName: this.peopleData.firstName
      ,lastName: this.peopleData.lastName,mobile: this.peopleData.mobile,email: this.peopleData.email
      ,birthDate: this.peopleData.birthDate},{size: "sm" }, true);
  }

  ngOnInit() {
  }

}
