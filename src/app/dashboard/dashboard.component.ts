import {Component, OnInit} from '@angular/core';
import { PeopleData } from '../shared/people-data';
import { PeopleService } from '../people/people.service';
import { GroupsService } from '../groups/groups.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isPeoplePage: Boolean = false;
  peopleCount : number= 0;
  groupsCount : number= 0;

  constructor(private peopleService: PeopleService, private groupsService: GroupsService) {
  }

  ngOnInit() {
    this.peopleService.getPeopleCount().then((value) => {
      this.peopleCount = value;
    });

    this.groupsService.getGroupsCount().then((value) => {
      this.groupsCount = value;
    });

  }

}


