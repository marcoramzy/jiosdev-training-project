import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { PeopleData } from './people-data';
import { GroupsData } from './groups-data';
import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class StorageService {

    personAddedSuccessfully = new Subject<PeopleData>();
    groupAddedSuccessfully = new Subject<GroupsData>();

    constructor(private http: HttpClient, private datePipe: DatePipe) {}
        
    async getPeople() : Promise<PeopleData[] >{ 
        return this.http
          .get( 
            'http://localhost:3000/people',
            {
              responseType: 'json',
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              })
            }
          )
          .pipe(
            map(responseData => {
              console.log("responseData",responseData);
              let peopleArray: PeopleData[] =[];
              for(let key in responseData) {
                peopleArray.push(responseData[key] );
              }
              console.log("peopleArray",peopleArray);
              return peopleArray;
            }),
            catchError(errorRes => {
              return throwError(errorRes);
            })
          ).toPromise();

    }

    async getPeopleWithBirthdaysThisMonth() : Promise<PeopleData[] >{ 
      return this.http
        .get( 
          'http://localhost:3000/people',
          {
            responseType: 'json',
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }
        )
        .pipe(
          map(responseData => {
            
            let now = new Date().getMonth();   
            let peopleArray: PeopleData[] =[];
            for(let key in responseData) {
                let sameMonth = false;
                let birthDate = new Date(responseData[key]["birthDate"]).getMonth();
                sameMonth = birthDate == now;
                if(sameMonth){
                  peopleArray.push(responseData[key] );
                }
            }
            return peopleArray;
          }),
          catchError(errorRes => {
            return throwError(errorRes);
          })
        ).toPromise();
    }

    async getPeopleCount() : Promise<number>{ 
      return this.http
        .get( 
          'http://localhost:3000/people',
          {
            responseType: 'json',
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }
        )
        .pipe(
          map(responseData => {
            console.log("responseData",responseData);
            let peopleCount: number=0;
            for(let key in responseData) {
              peopleCount++;
            }
            console.log("peopleCount",peopleCount);
            return peopleCount;
          }),
          catchError(errorRes => {
            return throwError(errorRes);
          })
        ).toPromise();
    }

    async addPerson(data : PeopleData) {

      return this.http
              .post<{ name: string }>(
                  'http://localhost:3000/people',
                  JSON.stringify(data),
                  {
                    observe: 'response',
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                    })
                  }
              )
              .subscribe(
                  responseData => {
                      console.log("responseData: ",responseData);
                      this.personAddedSuccessfully.next(data);
                  },
                  error => {
                      console.log("Error: ",error.message);
                  }
        );
    }

    async getGroups() : Promise<GroupsData[] >{ 
        return this.http
          .get( 
            'http://localhost:3000/groups',
            {
              responseType: 'json',
              headers: new HttpHeaders({
                'Content-Type': 'application/json',
              })
            }
          )
          .pipe(
            map(responseData => {
              console.log("responseData",responseData);
              let groupsArray: GroupsData[] =[];
              for(let key in responseData) {
                groupsArray.push(responseData[key] );
              }
              console.log("groupsArray",groupsArray);
              return groupsArray;
            }),
            catchError(errorRes => {
              return throwError(errorRes);
            })
          ).toPromise();

    }

    async getGroupsCount() : Promise<number>{ 
      return this.http
        .get( 
          'http://localhost:3000/groups',
          {
            responseType: 'json',
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
            })
          }
        )
        .pipe(
          map(responseData => {
            console.log("responseData",responseData);
            let groupsCount: number=0;
            for(let key in responseData) {
              groupsCount++;
            }
            console.log("groupsCount",groupsCount);
            return groupsCount;
          }),
          catchError(errorRes => {
            return throwError(errorRes);
          })
        ).toPromise();
    }

    async addGroup(data : GroupsData) {

      return this.http
              .post<{ name: string }>(
                  'http://localhost:3000/groups',
                  JSON.stringify(data),
                  {
                    observe: 'response',
                    headers: new HttpHeaders({
                      'Content-Type': 'application/json',
                    })
                  }
              )
              .subscribe(
                  responseData => {
                      console.log("responseData: ",responseData);
                      this.groupAddedSuccessfully.next(data);
                  },
                  error => {
                      console.log("Error: ",error.message);
                  }
        );
    }

}