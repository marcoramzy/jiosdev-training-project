import { Injectable } from '@angular/core';
import { BaseDataService } from '../shared/services/base-data.service';
import { GroupsData } from '../shared/models/groups-data';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class DashboardService {

  constructor(private baseDataService: BaseDataService) {
  }

  getStatistics(): Observable<any> {
    const url  = `A7640AB420A47E4C/Core/Dashboard/GetStatistics`;
    return this.baseDataService.get(url)
      .pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

}
