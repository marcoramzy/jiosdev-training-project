import { Component, OnInit, ViewChild, OnDestroy, OnChanges } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Input } from '@angular/core';
import { PeopleService } from 'src/app/people/people.service';
import { PeopleData } from '../models/people-data';
import { Subscription, Subject, Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { takeUntil } from 'rxjs/operators';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.scss']
})
export class AppListPeopleComponent implements OnInit, OnDestroy, OnChanges {

  destroyed = new Subject();
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<PeopleData>;
  people: PeopleData[] = [];

  @Input() isPeoplePage = false;

  @Input() dataSourceInput: PeopleData[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private peopleService: PeopleService, private storageService: StorageService) {
  }

  ngOnInit() {
      if (this.isPeoplePage) // people page
      {
        this.displayedColumns = ['name', 'mobile', 'email'];
      }
      else // dashboard page
      {
        this.displayedColumns = ['name', 'mobile', 'email', 'birthDate'];
      }

      /// Refresh Table (Record Added)
      this.storageService.personAddedSuccessfully.pipe(takeUntil(this.destroyed)).subscribe(
        (person) => {
          this.people.push(person);
          this.dataSourceSetup(this.people);
        }
      );

  }

  ngOnChanges(changes) {
    if (changes.dataSourceInput) {
      this.dataSourceSetup(this.dataSourceInput);
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataSourceSetup(dataSource) {
    console.log(dataSource);
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
