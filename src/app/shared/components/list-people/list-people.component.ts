import { Component, OnInit, OnChanges, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Input } from '@angular/core';
import { PeopleData } from '../../models/people-data';
import { BaseDataService } from '../../services/base-data.service';
import { DialogService } from '../../services/dialog.service';
import { AppListPeopleModel } from './list-people.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComponentType } from '@angular/cdk/portal';
import { PeopleAddDialogComponent } from 'src/app/people/people-add-dialog/people-add-dialog.component';
import { PeopleViewDialogComponent } from 'src/app/people/people-view-dialog/people-view-dialog.component';
import { PeopleService } from 'src/app/people/people.service';


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
  @Input() peopleDataSource: PeopleData[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private dialogService: DialogService, private baseDataService: BaseDataService, private peopleService: PeopleService) {
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
    if (changes.peopleDataSource) {
      this.model.people = this.peopleDataSource;
      this.dataSourceSetup(this.peopleDataSource);
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

  openDialog(dialogComponent: ComponentType<any> | TemplateRef<any>, peopleData?): void {
    this.dialogService.openDialog(dialogComponent, {
      Id: peopleData.Id,
      Name: {FirstName: peopleData?.Name?.FirstName, SecondName: peopleData?.Name?.SecondName},
      Mobile: peopleData.Mobile, Email: peopleData.Email
      , Birthdate: peopleData.Birthdate, PhotoFile: peopleData.PhotoFile, Gender: peopleData?.Gender,
    }, { size: 'md' }, true);
  }

  openDeleteDialog(id: number  ): void {
    this.dialogService.openDeleteDialog( null, { size: 'md' }, false, () => { this.deleteActionCallback(id); } );
  }

  deleteActionCallback(id: number){
    this.peopleService.deletePerson(id);
  }

  onEditPerson(data) {
    console.log('my data', data);
    this.openDialog(PeopleAddDialogComponent, data);
  }

  onDeletePerson(id: number) {
    this.openDeleteDialog(id);
  }

  onViewPerson(data) {
    this.openDialog(PeopleViewDialogComponent, data);
  }

  private initModel() {
    this.model = new AppListPeopleModel();
  }
}
