import { MatTableDataSource } from '@angular/material/table';
import { PeopleData } from '../models/people-data';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';

export class AppListPeopleModel {
    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<PeopleData>;
    people: PeopleData[] = [];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
}
