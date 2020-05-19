import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { PeopleData } from '../models/people-data';
import { GroupsData } from '../models/groups-data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {

  personAddedSuccessfully = new Subject<PeopleData[]>();
  groupAddedSuccessfully = new Subject<GroupsData[]>();

  constructor(private http: HttpClient) { }

  async getPeople(): Promise<PeopleData[]> {
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
          console.log('responseData', responseData);
          const peopleArray: PeopleData[] = [];
          for (const key of Object.keys(responseData)) {
            peopleArray.push(responseData[key]);
          }
          console.log('peopleArray', peopleArray);
          return peopleArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      ).toPromise();

  }

  async getPeopleById(id: number): Promise<PeopleData> {
    return this.http
      .get(
        'http://localhost:3000/people/' + id,
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      )
      .pipe(
        map(responseData => {
          const peopleArray: any = responseData;
          return peopleArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      ).toPromise();

  }

  async getPeopleByGorupId(id: number): Promise<PeopleData[]> {
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
      ).toPromise();

  }

  async getPeopleWithBirthdaysThisMonth(): Promise<PeopleData[]> {
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
      ).toPromise();
  }

  async getPeopleCount(): Promise<number> {
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
      ).toPromise();
  }

  async addPerson(data: PeopleData) {

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
        async responseData => {
          // console.log('responseData: ', responseData);
          // this.personAddedSuccessfully.next(data);
          const people: PeopleData[] = await this.getPeople();
          this.personAddedSuccessfully.next(people);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

  async getGroups(): Promise<GroupsData[]> {
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
        map(async responseData => {
          console.log('responseData', responseData);
          const groupsArray: GroupsData[] = [];
          const people: PeopleData[] = await this.getPeople();
          for (const key of Object.keys(responseData)) {
            let count = 0;
            for (const personKey of Object.keys(people)) {
              if (people[personKey].id === responseData[key].leader_id) {
                responseData[key].leader = people[personKey].firstName + ' ' + people[personKey].lastName;
              }

              for (const pKey of Object.keys(people[personKey].groups)) {
                if (people[personKey].groups[pKey] === responseData[key].id) {
                  count++;
                }
              }
            }

            responseData[key].count = count;
            groupsArray.push(responseData[key]);
          }
          console.log('groupsArray', groupsArray);
          return groupsArray;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      ).toPromise();

  }

  async getGroupsCount(): Promise<number> {
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
          console.log('responseData', responseData);
          let groupsCount = 0;
          for (const key of Object.keys(responseData)) {
            groupsCount++;
          }
          console.log('groupsCount', groupsCount);
          return groupsCount;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      ).toPromise();
  }

  async addGroup(data: GroupsData) {

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
        async responseData => {
          const groups: GroupsData[] = await this.getGroups();
          this.groupAddedSuccessfully.next(groups);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

  async editGroup(id: number, data: GroupsData) {

    return this.http
      .put<{ name: string }>(
        'http://localhost:3000/groups/' + id,
        JSON.stringify(data),
        {
          observe: 'response',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      )
      .subscribe(
        async responseData => {
          const groups: GroupsData[] = await this.getGroups();
          this.groupAddedSuccessfully.next(groups);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

  async editPerson(id: number, data: PeopleData) {

    return this.http
      .put<{ name: string }>(
        'http://localhost:3000/people/' + id,
        JSON.stringify(data),
        {
          observe: 'response',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      )
      .subscribe(
        async responseData => {
          const people: PeopleData[] = await this.getPeople();
          this.personAddedSuccessfully.next(people);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

  async deleteGroup(id: number) {

    return this.http
      .delete<{ name: string }>(
        'http://localhost:3000/groups/' + id,
      )
      .subscribe(
        async responseData => {
          const groups: GroupsData[] = await this.getGroups();
          this.groupAddedSuccessfully.next(groups);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

  async deletePerson(id: number) {

    return this.http
      .delete<{ name: string }>(
        'http://localhost:3000/people/' + id,
      )
      .subscribe(
        async responseData => {
          const people: PeopleData[] = await this.getPeople();
          this.personAddedSuccessfully.next(people);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );
  }

}
