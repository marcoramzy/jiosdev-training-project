import {Component, OnInit, ViewChild} from '@angular/core';
// import {MatPaginator} from '@angular/material/paginator';
// import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { DialogService } from '../shared/dialog.service';
import { PeopleData } from '../shared/people-data';


export interface UserData {
  id ?: string;
  name: string;
  mobile: string;
  email: string;
}

/** Constants used to fill up our data base. */
const emails: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  displayedColumns: string[] = ['name', 'mobile', 'email']; //'id', 
  dataSource: MatTableDataSource<UserData>;
  displayHeader: Boolean = true;

  peopleData:PeopleData={} as PeopleData;


  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor( public dialogService: DialogService,) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  
  openDialog(): void {

    this.dialogService.openPeopleDialog({id: this.peopleData.id,firstName: this.peopleData.firstName
      ,lastName: this.peopleData.lastName,mobile: this.peopleData.mobile,email: this.peopleData.email
      ,birthDate: this.peopleData.birthDate},{size: "sm" }, true);

  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }
}

/** Builds and returns a new User. */
function createNewUser(id: number): UserData {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  return {
    // id: id.toString(),
    name: name,
    mobile: Math.round(Math.random() * 100).toString(),
    email: emails[Math.round(Math.random() * (emails.length - 1))]
  };
}
