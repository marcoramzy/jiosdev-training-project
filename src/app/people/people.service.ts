import { Injectable, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { PeopleData } from '../shared/models/people-data';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class PeopleService {
  constructor(private storageService: StorageService){
  }

  async getPeople(): Promise<PeopleData[]> {
    const people: PeopleData[] = await this.getPeopleUtilityFn();
    console.log('PeopleService async getPeople', people);
    return people;
  }

  async getPeopleById(id: number): Promise<PeopleData> {
    const people: PeopleData = await this.getPeopleByIdUtilityFn(id);
    console.log('PeopleService async getPeopleById', people);
    return people;
  }

  async getPeopleByGorupId(id: number): Promise<PeopleData[]> {
    const people: PeopleData[] = await this.getPeopleByGorupIdUtilityFn(id);
    console.log('PeopleService async getPeopleByGorupId', people);
    return people;
  }

  async getPeopleWithBirthdaysThisMonth(): Promise<PeopleData[]> {
    const people: PeopleData[] = await this.getPeopleWithBirthdaysThisMonthUtilityFn();
    console.log('PeopleService async getPeopleWithBirthdaysThisMonth', people);
    return people;
  }

  getPeopleCount(): Observable<number> {
    // const peopleCount: number = await this.getPeopleCountUtilityFn();
    // const peopleCount: number = await this.getPeopleCountUtilityFn();
    return this.storageService.getPeopleCount().pipe(
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
    // console.log('PeopleService async getPeople', peopleCount);
    // return peopleCount;
  }

  async addPerson(data: PeopleData){
    const people: PeopleData[] = await this.getPeopleUtilityFn();
    if (people != null && people !== [] ){
      const lastId = people[people.length - 1].id;
      console.log('last_id', lastId);
      console.log('data', data);
      data.id = lastId + 1;
      console.log('data', data);
    }
    else{
      data.id = 1;
    }
    this.addPersonUtilityFn(data);
  }

  async editPerson(id: number, data: PeopleData){
    this.editPersonUtilityFn(id, data);
  }

  async deletePerson(id: number){
    this.deletePersonUtilityFn(id);
  }

  // UTILITY FUNCTIONS AREA
  async getPeopleUtilityFn(): Promise<PeopleData[]> {
    let people: any = await this.storageService.getPeople();
    if (people === null) {
      people = [];
    }
    console.log('PeopleService getPeopleUtilityFn', people);
    return people;
  }

  async getPeopleByIdUtilityFn(id: number): Promise<PeopleData> {
    let people: any = await this.storageService.getPeopleById(id);
    if (people === null) {
      people = {};
    }
    console.log('PeopleService getPeopleByIdUtilityFn', people);
    return people;
  }

  async getPeopleByGorupIdUtilityFn(id: number): Promise<PeopleData[]> {
    let people: any = await this.storageService.getPeopleByGorupId(id);
    if (people === null) {
      people = [];
    }
    console.log('PeopleService getPeopleByGorupIdUtilityFn', people);
    return people;
  }

  async getPeopleWithBirthdaysThisMonthUtilityFn(): Promise<PeopleData[]> {
    let people: any = await this.storageService.getPeopleWithBirthdaysThisMonth();
    if (people === null) {
      people = [];
    }
    console.log('PeopleService getPeopleWithBirthdaysThisMonthUtilityFn', people);
    return people;
  }

  async addPersonUtilityFn(data: PeopleData){
    this.storageService.addPerson(data);
  }

  async editPersonUtilityFn(id: number, data: PeopleData){
    this.storageService.editPerson(id, data);
  }

  async deletePersonUtilityFn(id: number){
    this.storageService.deletePerson(id);
  }

}
