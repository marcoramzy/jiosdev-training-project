import { Injectable } from '@angular/core';
import { BaseDataService } from '../shared/services/base-data.service';
import { GroupsData } from '../shared/models/groups-data';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class GroupsService {

  apiUrl = `groups`;
  groupAddedSuccessfully = new Subject<boolean>();

  constructor(private baseDataService: BaseDataService) {
  }

  getGroups(): Observable<GroupsData[]> {
    return this.baseDataService.get(this.apiUrl)
      .pipe(
        map(responseData => {
          return responseData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  getGroupsWithCountComputed(responseData): Observable<GroupsData[]> {

    const peopleUrl  = `people`;
    return this.baseDataService.get(peopleUrl)
      .pipe(
        map(people => {
          console.log('responseData', responseData);
          console.log('people', people);
          const groupsArray: GroupsData[] = [];
          // const people: PeopleData[] = await this.getPeople();
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
      );

  }

  getGroupsCount(): Observable<number> {

    return this.baseDataService.get(this.apiUrl)
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
      );
  }

  addGroup(data: GroupsData) {

    this.getGroups().subscribe(
      (groups) => {
        if (groups != null && groups !== []) {
          const lastId = groups[groups.length - 1].id;
          data.id = lastId + 1;
        }
        else {
          data.id = 1;
        }

        this.baseDataService.create(this.apiUrl, data)
          .subscribe(
            responseData => {
              this.groupAddedSuccessfully.next(true);
            },
            error => {
              console.log('Error: ', error.message);
            }
          );

      }
    );

  }

  editGroup(id: number, data: GroupsData) {
    const url = `${this.apiUrl}/${id}`;

    this.baseDataService.edit(url, data)
      .subscribe(
        responseData => {
          this.groupAddedSuccessfully.next(true);
        },
        error => {
          console.log('Error: ', error.message);
        }
      );

  }

  deleteGroup(id: number) {
    const url = `${this.apiUrl}/${id}`;
    this.baseDataService.delete(url)
    .subscribe(
      responseData => {
        this.groupAddedSuccessfully.next(true);
      },
      error => {
        console.log('Error: ', error.message);
      }
    );

  }

}
