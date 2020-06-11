import {Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  destroyed = new Subject();
  ChurchServiceCards: any[];
  ProgressCards: any[];

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {

    this.getStatistics();

  }

  getStatistics(){
      this.dashboardService.getStatistics().pipe(takeUntil(this.destroyed)).subscribe(
        (res) => {
          console.log('getStatistics: ', res);
          this.ChurchServiceCards = res.ResultData.ChurchServiceCards;
          this.ProgressCards = res.ResultData.ProgressCards;
        }
      );
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

}


