import { Subject } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { PeopleData } from '../shared/people-data';


@Injectable()
export class PeopleService implements OnInit {
  constructor(private storageService: StorageService){
  }

  ngOnInit(): void {
    
  }

  async getPeople() : Promise<PeopleData[]> {
    let people : PeopleData[] = await this.getPeopleUtilityFn();
    console.log("PeopleService async getPeople",people);
    return people;
  }

  async getPeopleWithBirthdaysThisMonth() : Promise<PeopleData[]> {
    let people : PeopleData[] = await this.getPeopleWithBirthdaysThisMonthUtilityFn();
    console.log("PeopleService async getPeopleWithBirthdaysThisMonth",people);
    return people;
  }

  async getPeopleCount() : Promise<number> {
    let peopleCount : number = await this.getPeopleCountUtilityFn();
    console.log("PeopleService async getPeople",peopleCount);
    return peopleCount;
  }

  // UTILITY FUNCTIONS AREA
  async getPeopleUtilityFn() : Promise<PeopleData[]> {
    let people : any = await this.storageService.getPeople();
    if (people === null) {
      people=[];
    }
    console.log("PeopleService getPeopleUtilityFn",people);
    return people;
  }
  
  async getPeopleWithBirthdaysThisMonthUtilityFn() : Promise<PeopleData[]> {
    let people : any = await this.storageService.getPeopleWithBirthdaysThisMonth();
    if (people === null) {
      people=[];
    }
    console.log("PeopleService getPeopleWithBirthdaysThisMonthUtilityFn",people);
    return people;
  }

  async getPeopleCountUtilityFn() : Promise<number> {
    let peopleCount : any = await this.storageService.getPeopleCount();

    console.log("PeopleService getPeopleCountUtilityFn",peopleCount);
    return peopleCount;
  }

}
