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

  async addPerson(data: PeopleData){
    let people : PeopleData[] = await this.getPeopleUtilityFn();
    if(people != null && people!= [] ){
      let last_id= people[people.length-1]["id"];
      console.log("last_id",last_id);
      console.log("data",data);
      data["id"]= last_id+1;
      console.log("data",data);
    }
    else{
      data["id"]=1;
    }
    this.addPersonUtilityFn(data);
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

  async addPersonUtilityFn(data : PeopleData){
    this.storageService.addPerson(data);
  }

}
