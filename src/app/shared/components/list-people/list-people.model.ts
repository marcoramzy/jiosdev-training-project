import { MatTableDataSource } from '@angular/material/table';
import { PeopleData } from '../../models/people-data';
import { UrlsConstants } from '../../constants/urls.constants';

export class AppListPeopleModel {
    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<PeopleData>;
    people: PeopleData[] = [];
    defaultImageSrc = UrlsConstants.defaultImageSrc;

}
