import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { DialogService } from '../shared/services/dialog.service';
import { PeopleService } from './people.service';
import { takeUntil } from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import { PeopleAddDialogComponent } from './people-add-dialog/people-add-dialog.component';
import { AppPeopleModel } from './people.model';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  model: AppPeopleModel;

  constructor(
    public dialogService: DialogService,
    private peopleService: PeopleService,
    private route: ActivatedRoute) {
      this.initModel();
  }

  ngOnInit() {
    let groupId: string = null;

    this.route.queryParams.subscribe(params => {
        groupId = params.group_id;
        console.log('groupId', groupId);
        this.getPeopleData(groupId);
    });

    /// Refresh Table (Record Added)
    this.peopleService.personAddedSuccessfully.pipe(takeUntil(this.model.destroyed)).subscribe(
      () => {
        this.getPeopleData(groupId);
      }
    );

  }

  ngOnDestroy(): void {
    this.model.destroyed.next();
    this.model.destroyed.complete();
  }

  getPeopleData(groupId){
      if ( (groupId === undefined) || (groupId === null) ) // People Normal list data
      {
          this.peopleService.getPeople().subscribe((value) => {
            this.model.peopleDataSource = value;
          });
      }
  }

  openDialog(): void {
    this.dialogService.openDialog(PeopleAddDialogComponent, {
      Id: this.model.peopleData.Id,
      Name: {FirstName: this.model.peopleData?.Name?.FirstName, SecondName: this.model.peopleData?.Name?.SecondName},
      Mobile: this.model.peopleData.Mobile, Email: this.model.peopleData.Email
      , Birthdate: this.model.peopleData.Birthdate, PhotoFile: this.model.peopleData.PhotoFile, Gender: this.model.peopleData.Gender,
    }, { size: 'lg' }, true);
  }

  private initModel() {
    this.model = new AppPeopleModel();
  }

}
