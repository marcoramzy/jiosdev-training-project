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

}
