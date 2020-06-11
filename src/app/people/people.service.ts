import { Injectable } from '@angular/core';
import { BaseDataService } from '../shared/services/base-data.service';
import { PeopleData } from '../shared/models/people-data';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class PeopleService {

  apiUrl = `people`;
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
    // const url = `${this.apiUrl}/${id}`;
    // const url = `Core/Member/MemberDashboard?id=${1558580}`;
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

  getPeopleByGorupId(id: number): Observable<PeopleData[]> {
    return this.baseDataService.getById(this.apiUrl)
      .pipe(
        map(responseData => {
          console.log('responseData', responseData);
          const peopleArray: PeopleData[] = [];
          for (const key of Object.keys(responseData)) {

            for (const group in responseData[key].groups) {
              if (responseData[key].groups[group].toString() === id.toString()) {
                peopleArray.push(responseData[key]);
                // break;
              }
            }
          }
          console.log('peopleArray', peopleArray);
          return peopleArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  getPeopleWithBirthdaysThisMonth(): Observable<PeopleData[]> {
    return this.baseDataService.get(this.apiUrl)
      .pipe(
        map(responseData => {

          const now = new Date().getMonth();
          const peopleArray: PeopleData[] = [];
          for (const key of Object.keys(responseData)) {

            let sameMonth = false;
            const birthDate = new Date(responseData[key].birthDate).getMonth();
            sameMonth = birthDate === now;
            if (sameMonth) {
              peopleArray.push(responseData[key]);
            }
          }
          return peopleArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  getPeopleCount(): Observable<number> {
    return this.baseDataService.get(this.apiUrl).pipe(
      map(responseData => {
        console.log('responseData', responseData);
        let peopleCount = 0;
        for (const key of Object.keys(responseData)) {
          peopleCount++;
        }
        console.log('peopleCount', peopleCount);
        return peopleCount;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  addPersonOld(data: PeopleData) {

    this.getPeople().subscribe(
      (people) => {
        if (people != null && people !== []) {
          const lastId = people[people.length - 1].Id;
          data.Id = lastId + 1;
        }
        else {
          data.Id = 1;
        }

        this.baseDataService.create(this.apiUrl, data)
          .subscribe(
            responseData => {
              this.personAddedSuccessfully.next(true);
            },
            error => {
              console.log('Error: ', error.message);
            }
          );

      }
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
    // const url = `${this.apiUrl}/${id}`;
    // const url = `${this.apiUrl}/${id}`;
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
    // const url = `${this.apiUrl}/${id}`;
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
