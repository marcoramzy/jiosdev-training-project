import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogService } from '../shared/services/dialog.service';
import { GroupsData } from '../shared/models/groups-data';
import { GroupsService } from './groups.service';
import { Subject } from 'rxjs';
import { StorageService } from '../shared/services/storage.service';
import { takeUntil } from 'rxjs/operators';


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

  // groupsData: GroupsData = {} as GroupsData;


  constructor(public dialogService: DialogService, private groupsService: GroupsService, private storageService: StorageService) {

  }

  ngOnInit() {
    this.groupsService.getGroups().then((value) => {
      this.groups = value;
      this.dataSourceSetup(this.groups);
    });

    /// Refresh Table (Record Added)
    this.storageService.groupAddedSuccessfully.pipe(takeUntil(this.destroyed)).subscribe(
      (groups) => {
        this.groups = groups;
        this.dataSourceSetup(this.groups);
      }
      // (group) => {this.groups.push(group);this.dataSourceSetup(this.groups);}

    );

  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  openDialog(editMode: boolean, groupsData?): void {
    this.dialogService.openDialog('groups', {
      id: groupsData?.id,
      name: groupsData?.name,
      leader_id: groupsData?.leader_id,
      description: groupsData?.description
    }, { size: 'md' }, true, editMode);
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

  onEditGroup(data) {
    console.log('my data', data);
    // this.groupsData = data;
    this.openDialog(true, data);
  }

  onDeleteGroup(id: number) {
    this.openDeleteDialog(id);
    // this.groupsService.deleteGroup(id);
  }

}

