import { Injectable } from '@angular/core';
import { BaseDataService } from '../shared/services/base-data.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventData } from '../shared/models/event-data';
import { ServiceInfoData } from '../shared/models/service-info-data';


@Injectable()
export class CalenderService {

  constructor(private baseDataService: BaseDataService) {
  }

  getServiceInformation(): Observable<ServiceInfoData> {
    const url = `Public/Calendar/ListCalendars?chId=35666DC28224AFCA`;
    return this.baseDataService.get(url)
      .pipe(
        map(responseData => {
          console.log('Service Information', responseData.ResultData);
          return responseData.ResultData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }


  getEvents(startDate: Date, endDate: Date): Observable<EventData[]> {
    const url = `35666DC28224AFCA/Public/Calendar/Events?start=${startDate}&end=${endDate}`;
    return this.baseDataService.get(url)
      .pipe(
        map(responseData => {
          console.log('Events', responseData.Data);
          return responseData.Data;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

}


