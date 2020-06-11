import { Injectable } from '@angular/core';
import { BaseDataService } from '../shared/services/base-data.service';
import { PeopleData } from '../shared/models/people-data';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class PeopleService {

  personAddedSuccessfully = new Subject<boolean>();

  constructor(private baseDataService: BaseDataService) {
  }

  getPeople(): Observable<PeopleData[]> {
    const url = `Core/Member/ListMembers`;
    const defaultData = {OperationType: 1};


    return this.baseDataService.create(url, defaultData
      ).pipe(
      map(responseData => {
        console.log('responseData', responseData.Data);
        const peopleArray: PeopleData[] = [];
        for (const key of Object.keys(responseData.Data)) {
          peopleArray.push(responseData.Data[key]);
        }
        console.log('peopleArray', peopleArray);
        return peopleArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  getPeopleById(id: number): Observable<PeopleData> {
    const url = `Core/Member/MemberDashboard?id=${id}`;
    return this.baseDataService.getById(url)
      .pipe(
        map(responseData => {
          let people: any = responseData?.ResultData?.Model;
          console.log('people', responseData?.ResultData?.Model);
          if (people === null) {
            people = {};
          }
          return people;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  addPerson(data: PeopleData) {

    const url = 'Core/Member/Create';

    this.baseDataService.create(url, data)
      .subscribe(
        responseData => {
          console.log('ADDED PERSON RESPONSE', responseData);
          this.personAddedSuccessfully.next(true);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

  editPerson(id: number, data: PeopleData) {
    const url = `Core/Member/Update`;

    this.baseDataService.create(url, data)
      .subscribe(
        responseData => {
          this.personAddedSuccessfully.next(true);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

  deletePerson(id: number) {
    const url = `Core/Member/Delete/${id}`;

    this.baseDataService.delete(url)
      .subscribe(
        responseData => {
          this.personAddedSuccessfully.next(true);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

}
