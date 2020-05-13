import { Injectable, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { GroupsData } from '../shared/groups-data';


@Injectable()
export class GroupsService implements OnInit {
  constructor(private storageService: StorageService){
  }

  ngOnInit(): void {
    
  }

  async getGroups() : Promise<GroupsData[]> {
    let groups : GroupsData[] = await this.getGroupsUtilityFn();
    console.log("GroupsService async getGroups",groups);
    return groups;
  }

  async getGroupsCount() : Promise<number> {
    let groupsCount : number = await this.getGroupsCountUtilityFn();
    console.log("GroupsService async getGroupsCount",groupsCount);
    return groupsCount;
  }

  async addGroup(data: GroupsData){
    let groups : GroupsData[] = await this.getGroupsUtilityFn();
    if(groups != null && groups!= [] ){
      let last_id= groups[groups.length-1]["id"];
      console.log("last_id",last_id);
      console.log("data",data);
      data["id"]= last_id+1;
      console.log("data",data);
    }
    else{
      data["id"]=1;
    }
    this.addGroupUtilityFn(data);
  }

  // UTILITY FUNCTIONS AREA (Storage)
  async getGroupsUtilityFn() : Promise<GroupsData[]> {
    let groups : any = await this.storageService.getGroups();
    if (groups === null) {
      groups=[];
    }
    console.log("GroupsService getGroupsUtilityFn",groups);
    return groups;
  }

  async getGroupsCountUtilityFn() : Promise<number> {
    let groupsCount : any = await this.storageService.getGroupsCount();

    console.log("GroupsService getGroupsCountUtilityFn",groupsCount);
    return groupsCount;
  }

  async addGroupUtilityFn(data : GroupsData){
    this.storageService.addGroup(data);
  }

}
