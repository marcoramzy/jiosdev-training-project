import { Injectable, OnInit } from '@angular/core';
import { BaseDataService } from '../shared/services/base-data.service';
import { GroupsData } from '../shared/models/groups-data';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class GroupsService {

  groupAddedSuccessfully = new Subject<boolean>();

  constructor(private baseDataService: BaseDataService) {
  }

  getGroups(): Observable<GroupsData[]> {
    return this.baseDataService.getGroups()
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

    return this.baseDataService.getPeople()
      .pipe(
        map(people => {
          console.log('responseData', responseData);
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
    return this.baseDataService.getGroupsCount()
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

        this.baseDataService.addGroup(data)
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

    this.baseDataService.editGroup(id, data)
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

    this.baseDataService.deleteGroup(id)
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
