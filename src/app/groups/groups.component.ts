import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../shared/services/dialog.service';
import { GroupsData } from '../shared/models/groups-data';
import { GroupsService } from './groups.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PeopleService } from '../people/people.service';
import { PeopleViewDialogComponent } from '../people/people-view-dialog/people-view-dialog.component';
import { GroupsAddDialogComponent } from './groups-add-dialog/groups-add-dialog.component';
import { GroupsViewDialogComponent } from './groups-view-dialog/groups-view-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { DeleteDialogComponent } from '../shared/components/delete-dialog/delete-dialog.component';

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

  openDialog( dialogComponent: ComponentType<any> | TemplateRef<any>, groupsData, peopleViewFlag: boolean): void {
        this.dialogService.openDialog(dialogComponent, {
          id: groupsData?.id,
          name: groupsData?.name,
          leader_id: peopleViewFlag ? groupsData : groupsData?.leader_id,
          description: groupsData?.description
        }, { size: 'md' }, true);
  }

  openDeleteDialog(id: number): void {
    this.dialogService.openDialog(DeleteDialogComponent,
      { id: (id), type: 'groups'}, { size: 'md' }, false);
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
    this.openDialog(PeopleViewDialogComponent, leaderId, true);
  }

  onEditGroup(data) {
    console.log('my data', data);
    this.openDialog(GroupsAddDialogComponent, data, false);
  }

  onViewGroup(data) {
    console.log('my data', data);
    this.openDialog(GroupsViewDialogComponent, data, false);
  }

  onDeleteGroup(id: number) {
    this.openDeleteDialog(id);
  }

  openAddGroupDialog(){
    this.openDialog(GroupsAddDialogComponent, null, false);

  }

}

