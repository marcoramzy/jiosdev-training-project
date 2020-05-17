import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { PeopleService } from 'src/app/people/people.service';
import { PeopleData } from '../models/people-data';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage.service';


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.scss']
})
export class SharedTableComponent implements OnInit {

  private personAddSubscription: Subscription;
  displayedColumns: string[] = [];
  dataSource: MatTableDataSource<PeopleData>;
  people: PeopleData[] = [];

  @Input() isPeoplePage = false;
  @Output() addPersonClick = new EventEmitter();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private peopleService: PeopleService, private storageService: StorageService) {
  }

  ngOnInit() {
    if (this.isPeoplePage) // people page
    {
      this.displayedColumns = ['name', 'mobile', 'email'];
      this.peopleService.getPeople().then((value) => {
        this.people = value;
        this.dataSourceSetup(this.people);
    });

    }
    else // dashboard page
    {
      this.displayedColumns = ['name', 'mobile', 'email', 'birthDate'];
      this.peopleService.getPeopleWithBirthdaysThisMonth().then((value) => {
        this.dataSource = new MatTableDataSource(value);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }

    /// Refresh Table (Record Added)
    this.personAddSubscription = this.storageService.personAddedSuccessfully.subscribe(
      (person) => {
            this.people.push(person);
            this.dataSourceSetup(this.people);
    });

  }

  public onAddPersonClick = () => {
    this.addPersonClick.emit();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataSourceSetup(dataSource){
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
