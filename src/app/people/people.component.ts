import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DialogService } from '../shared/services/dialog.service';
import { PeopleData } from '../shared/models/people-data';
import { PeopleService } from './people.service';
import { BaseDataService } from '../shared/services/base-data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import { PeopleAddDialogComponent } from './people-add-dialog/people-add-dialog.component';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  destroyed = new Subject();
  isPeoplePage = true;
  peopleData: PeopleData = {} as PeopleData;
  peopleDataSource: PeopleData[];

  constructor(
    public dialogService: DialogService,
    private peopleService: PeopleService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    let groupId: string = null;

    this.route.queryParams.subscribe(params => {
        groupId = params.group_id;
        console.log('groupId', groupId);
        this.getPeopleData(groupId);
    });

    /// Refresh Table (Record Added)
    this.peopleService.personAddedSuccessfully.pipe(takeUntil(this.destroyed)).subscribe(
      () => {
        this.getPeopleData(groupId);
      }
    );

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getPeopleData(groupId){
      if ( (groupId === undefined) || (groupId === null) ) // People Normal list data
      {
          this.peopleService.getPeople().subscribe((value) => {
            this.peopleDataSource = value;
          });
      }
      else // People list data filtered by groupId
      {
          this.peopleService.getPeopleByGorupId(+groupId).subscribe((value) => {
            this.peopleDataSource = value;
          });
      }
  }

  openDialog(): void {
    this.dialogService.openDialog(PeopleAddDialogComponent, {
      id: this.peopleData.id, firstName: this.peopleData.firstName
      , lastName: this.peopleData.lastName, mobile: this.peopleData.mobile, email: this.peopleData.email
      , birthDate: this.peopleData.birthDate, groups: this.peopleData.groups
    }, { size: 'md' }, true);
  }

}
