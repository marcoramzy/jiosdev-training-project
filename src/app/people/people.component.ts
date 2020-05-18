import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import { DialogService } from '../shared/services/dialog.service';
import { PeopleData } from '../shared/models/people-data';
import { MatTableDataSource } from '@angular/material/table';
import { PeopleService } from './people.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  isPeoplePage = true;
  peopleData: PeopleData = {} as PeopleData;
  dataSourceInput: PeopleData[];

  constructor( public dialogService: DialogService, private peopleService: PeopleService){

  }
  openDialog(editMode: boolean): void {
    this.dialogService.openDialog('people', {id: this.peopleData.id, firstName: this.peopleData.firstName
      , lastName: this.peopleData.lastName, mobile: this.peopleData.mobile, email: this.peopleData.email
      , birthDate: this.peopleData.birthDate}, {size: 'md' }, true, editMode);
  }

  ngOnInit() {

    this.peopleService.getPeople().then((value) => {
        this.dataSourceInput = value;
    });

  }

}
