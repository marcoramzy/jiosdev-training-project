import { Injectable } from '@angular/core';
import { BaseDataService } from '../shared/services/base-data.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventData } from '../shared/models/event-data';
import { ServiceInfoData } from '../shared/models/service-info-data';
import { DatePipe } from '@angular/common';
import { FormatsConstants } from '../shared/constants/formats.constants';


@Injectable()
export class CalenderService {
  ChurchId = '35666DC28224AFCA';

  constructor(private baseDataService: BaseDataService, private datePipe: DatePipe) {
  }

  getServiceInformation(): Observable<ServiceInfoData> {
    const url = `Public/Calendar/ListCalendars?chId=${this.ChurchId}`;
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
    const url = `${this.ChurchId}/Public/Calendar/Events?start=${this.transformDate(startDate)}&end=${this.transformDate(endDate)}`;
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

  transformDate(date) {
      return this.datePipe.transform(date, FormatsConstants.yearMonthDayDashFormat);
  }

}


