import {Component, OnInit, OnDestroy} from '@angular/core';
import { PeopleData } from '../shared/models/people-data';
import { PeopleService } from '../people/people.service';
import { GroupsService } from '../groups/groups.service';
import { StorageService } from '../shared/services/storage.service';
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

  constructor(private peopleService: PeopleService, private groupsService: GroupsService, private storageService: StorageService) {
  }

  ngOnInit() {
    this.peopleService.getPeopleCount().subscribe((value) => {
      this.peopleCount = value;
    });

    this.groupsService.getGroupsCount().then((value) => {
      this.groupsCount = value;
    });

    this.peopleService.getPeopleWithBirthdaysThisMonth().then((value) => {
      this.dataSourceInput = value;
    });

    /// Refresh Table (Record Added)
    this.storageService.personAddedSuccessfully.pipe(takeUntil(this.destroyed)).subscribe(
      () => {
        this.peopleService.getPeopleWithBirthdaysThisMonth().then((value) => {
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


