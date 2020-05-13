import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DialogService } from '../shared/dialog.service';
import { GroupsData } from '../shared/groups-data';
import { GroupsService } from './groups.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../shared/storage.service';


@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {

  private groupAddSubscription: Subscription;
  displayedColumns: string[] = ['name', 'leader', 'count','description']; //'id', 
  dataSource: MatTableDataSource<GroupsData>;
  groups : GroupsData[] =[];


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  groupsData:GroupsData={} as GroupsData;


  constructor(public dialogService: DialogService, private groupsService: GroupsService, private storageService: StorageService) {

  }

  openDialog(): void {
    this.dialogService.openGroupsDialog({id: this.groupsData.id,name: this.groupsData.name,leader: this.groupsData.leader,count: this.groupsData.count,description: this.groupsData.description},{size: "md" }, true);
  }

  ngOnInit() {
    this.groupsService.getGroups().then((value) => {
        this.groups=value;
        this.dataSourceSetup(this.groups);
    });

    ///Refresh Table (Record Added)
    this.groupAddSubscription = this.storageService.groupAddedSuccessfully.subscribe(      
      (group) => {
          this.groups.push(group);
          this.dataSourceSetup(this.groups)
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataSourceSetup(dataSource){
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

