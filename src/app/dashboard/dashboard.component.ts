import {Component, OnInit, OnDestroy} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from './dashboard.service';
import { AppDashboardModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  model: AppDashboardModel;

  constructor(private dashboardService: DashboardService) {
    this.initModel();
  }

  ngOnInit() {

    this.getStatistics();

  }

  getStatistics(){
      this.dashboardService.getStatistics().pipe(takeUntil(this.model.destroyed)).subscribe(
        (res) => {
          console.log('getStatistics: ', res);
          this.model.ChurchServiceCards = res.ResultData.ChurchServiceCards;
          this.model.ProgressCards = res.ResultData.ProgressCards;
        }
      );
  }

  ngOnDestroy(): void {
    this.model.destroyed.next();
    this.model.destroyed.complete();
  }

  private initModel() {
    this.model = new AppDashboardModel();
  }

}


