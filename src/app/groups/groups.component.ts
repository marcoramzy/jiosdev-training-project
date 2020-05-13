import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogService } from '../shared/dialog.service';
import { GroupsData } from '../shared/groups-data';
import { GroupsService } from './groups.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'leader', 'count','description']; //'id', 
  dataSource: MatTableDataSource<GroupsData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  groupsData:GroupsData={} as GroupsData;


  constructor(public dialogService: DialogService, private groupsService: GroupsService) {

  }

  openDialog(): void {
    this.dialogService.openGroupsDialog({id: this.groupsData.id,name: this.groupsData.name,leader: this.groupsData.leader,count: this.groupsData.count,description: this.groupsData.description},{size: "sm" }, true);
  }

  ngOnInit() {
    this.groupsService.getGroups().then((value) => {
      this.dataSource = new MatTableDataSource(value);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

