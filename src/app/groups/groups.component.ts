import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../shared/services/dialog.service';
import { GroupsData } from '../shared/models/groups-data';
import { GroupsService } from './groups.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PeopleService } from '../people/people.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit, OnDestroy {

  destroyed = new Subject();
  displayedColumns: string[] = ['name', 'leader', 'count', 'description', 'actions']; // 'id',
  dataSource: MatTableDataSource<GroupsData>;
  groups: GroupsData[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(public dialogService: DialogService, private groupsService: GroupsService, private peopleService: PeopleService) {

  }

  ngOnInit() {
    this.getGroupsData();

    /// Refresh Table (Record Added)
    this.groupsService.groupAddedSuccessfully.pipe(takeUntil(this.destroyed)).subscribe(
      () => {
        this.getGroupsData();
      }
    );

    this.peopleService.personAddedSuccessfully.pipe(takeUntil(this.destroyed)).subscribe(
      () => {
        this.getGroupsData();
      }
    );

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  getGroupsData(){
    this.groupsService.getGroups().subscribe((value) => {
      this.groupsService.getGroupsWithCountComputed(value).subscribe( (res) => {
        this.groups = res;
        this.dataSourceSetup(this.groups);
      });
    });
  }

  openDialog(dialogName: string, editMode: boolean, groupsData?): void {
    if (dialogName === 'peopleView'){
        this.dialogService.openDialog(dialogName, {
          id: groupsData?.id,
          name: groupsData?.name,
          leader_id: groupsData,
          description: groupsData?.description
        }, { size: 'md' }, true);
    }
    else{
        this.dialogService.openDialog(dialogName, {
          id: groupsData?.id,
          name: groupsData?.name,
          leader_id: groupsData?.leader_id,
          description: groupsData?.description
        }, { size: 'md' }, true);
    }
  }

  openDeleteDialog(id: number): void {
    this.dialogService.openDeleteDialog('groups',
      id, { size: 'md' }, true);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataSourceSetup(dataSource) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onViewPerson(leaderId: number){
    this.openDialog('peopleView', true, leaderId);
  }

  onEditGroup(data) {
    console.log('my data', data);
    this.openDialog('groups', true, data);
  }

  onViewGroup(data) {
    console.log('my data', data);
    this.openDialog('groupsView', true, data);
  }

  onDeleteGroup(id: number) {
    this.openDeleteDialog(id);
  }

}

