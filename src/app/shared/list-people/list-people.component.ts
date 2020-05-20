import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Input } from '@angular/core';
import { PeopleData } from '../models/people-data';
import { StorageService } from '../services/storage.service';
import { DialogService } from '../services/dialog.service';
import { AppListPeopleModel } from './list-people.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.scss']
})
export class AppListPeopleComponent implements OnInit, OnChanges {
  model: AppListPeopleModel;
  @Input() isPeoplePage = false;
  @Input() dataSourceInput: PeopleData[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialogService: DialogService, private storageService: StorageService) {
    this.initModel();
  }

  ngOnInit() {
    if (this.isPeoplePage) // people page
    {
      this.model.displayedColumns = ['name', 'mobile', 'email', 'actions'];
    }
    else // dashboard page
    {
      this.model.displayedColumns = ['name', 'mobile', 'email', 'birthDate'];
    }

  }

  ngOnChanges(changes) {
    if (changes.dataSourceInput) {
      this.model.people = this.dataSourceInput;
      this.dataSourceSetup(this.dataSourceInput);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.model.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.model.dataSource.paginator) {
      this.model.dataSource.paginator.firstPage();
    }
  }

  dataSourceSetup(dataSource) {
    console.log(dataSource);
    // Assign the data to the data source for the table to render
    this.model.dataSource = new MatTableDataSource(dataSource);
    this.model.dataSource.paginator = this.paginator;
    this.model.dataSource.sort = this.sort;
  }

  openDialog(dialogName: string, editMode: boolean, peopleData?): void {
    this.dialogService.openDialog(dialogName, {
      id: peopleData.id, firstName: peopleData.firstName
      , lastName: peopleData.lastName, mobile: peopleData.mobile, email: peopleData.email
      , birthDate: peopleData.birthDate, groups: peopleData.groups
    }, { size: 'md' }, true, editMode);
  }

  openDeleteDialog(id: number): void {
    this.dialogService.openDeleteDialog('people',
      id, { size: 'md' }, true);
  }

  onEditPerson(data) {
    console.log('my data', data);
    this.openDialog('people', true, data);
  }

  onDeletePerson(id: number) {
    this.openDeleteDialog(id);
  }

  onViewPerson(data) {
    this.openDialog('peopleView', true, data);
  }

  private initModel() {
    this.model = new AppListPeopleModel();
  }
}
