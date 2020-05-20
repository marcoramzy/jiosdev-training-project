import {
  HttpClient, HttpHeaders
} from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';
import { PeopleData } from '../models/people-data';
import { GroupsData } from '../models/groups-data';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseDataService {

  constructor(private http: HttpClient) { }

  getPeople(): Observable<any> {
    return this.http
      .get(
        'http://localhost:3000/people',
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      );
  }

  getPeopleById(id: number): Observable<any> {
    return this.http
      .get(
        'http://localhost:3000/people/' + id,
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      );

  }

  getPeopleByGorupId(id: number): Observable<any> {
    return this.http
      .get(
        'http://localhost:3000/people',
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      );
  }

  getPeopleWithBirthdaysThisMonth(): Observable<any> {
    return this.http
      .get(
        'http://localhost:3000/people',
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      );
  }

  getPeopleCount(): Observable<any> {
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
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
    // ;
  }

  addPerson(data: PeopleData) {

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
      );
  }

  getGroups(): Observable<any> {
    return this.http
      .get(
        'http://localhost:3000/groups',
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      );

  }

  getGroupsCount(): Observable<any> {
    return this.http
      .get(
        'http://localhost:3000/groups',
        {
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          })
        }
      );
  }

  addGroup(data: GroupsData) {

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
      );
  }

  editGroup(id: number, data: GroupsData) {

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
      );
  }

  editPerson(id: number, data: PeopleData) {

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
      );
  }

  deleteGroup(id: number) {

    return this.http
      .delete<{ name: string }>(
        'http://localhost:3000/groups/' + id,
      );
  }

  deletePerson(id: number) {

    return this.http
      .delete<{ name: string }>(
        'http://localhost:3000/people/' + id,
      );
  }

}
