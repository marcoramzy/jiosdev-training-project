import { MatTableDataSource } from '@angular/material/table';
import { PeopleData } from '../../models/people-data';

export class AppListPeopleOldModel {
    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<PeopleData>;
    people: PeopleData[] = [];

}
