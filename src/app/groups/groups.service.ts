import { Injectable, OnInit } from '@angular/core';
import { StorageService } from '../shared/services/storage.service';
import { GroupsData } from '../shared/models/groups-data';


@Injectable()
export class GroupsService {
  constructor(private storageService: StorageService){
  }

  async getGroups(): Promise<GroupsData[]> {
    const groups: GroupsData[] = await this.getGroupsUtilityFn();
    console.log('GroupsService async getGroups', groups);
    return groups;
  }

  async getGroupsCount(): Promise<number> {
    const groupsCount: number = await this.getGroupsCountUtilityFn();
    console.log('GroupsService async getGroupsCount', groupsCount);
    return groupsCount;
  }

  async addGroup(data: GroupsData){
    const groups: GroupsData[] = await this.getGroupsUtilityFn();
    if (groups != null && groups !== [] ){
      const lastId = groups[groups.length - 1].id;
      console.log('last_id', lastId);
      console.log('data', data);
      data.id = lastId + 1;
      console.log('data', data);
    }
    else{
      data.id = 1;
    }
    this.addGroupUtilityFn(data);
  }

  // UTILITY FUNCTIONS AREA (Storage)
  async getGroupsUtilityFn(): Promise<GroupsData[]> {
    let groups: any = await this.storageService.getGroups();
    if (groups === null) {
      groups = [];
    }
    console.log('GroupsService getGroupsUtilityFn', groups);
    return groups;
  }

  async getGroupsCountUtilityFn(): Promise<number> {
    const groupsCount: any = await this.storageService.getGroupsCount();

    console.log('GroupsService getGroupsCountUtilityFn', groupsCount);
    return groupsCount;
  }

  async addGroupUtilityFn(data: GroupsData){
    this.storageService.addGroup(data);
  }

}
