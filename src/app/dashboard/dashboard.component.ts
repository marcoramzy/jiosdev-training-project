import {Component, OnInit, OnDestroy} from '@angular/core';
import { PeopleData } from '../shared/models/people-data';
import { PeopleService } from '../people/people.service';
import { GroupsService } from '../groups/groups.service';
import { BaseDataService } from '../shared/services/base-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  destroyed = new Subject();
  isPeoplePage = false;
  peopleCount = 0;
  groupsCount = 0;
  dataSourceInput: PeopleData[];

  constructor(private peopleService: PeopleService, private groupsService: GroupsService, private baseDataService: BaseDataService) {
  }

  ngOnInit() {
    this.peopleService.getPeopleCount().subscribe((value) => {
      this.peopleCount = value;
    });

    this.groupsService.getGroupsCount().subscribe((value) => {
      this.groupsCount = value;
    });

    this.peopleService.getPeopleWithBirthdaysThisMonth().subscribe((value) => {
      this.dataSourceInput = value;
    });

    /// Refresh Table (Record Added)
    this.peopleService.personAddedSuccessfully.pipe(takeUntil(this.destroyed)).subscribe(
      () => {
        this.peopleService.getPeopleWithBirthdaysThisMonth().subscribe((value) => {
          this.dataSourceInput = value;
        });
      }
    );

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}


