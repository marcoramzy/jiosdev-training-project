import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CalenderComponent } from './calender.component';
import { CalenderListComponent } from './calender-list/calender-list.component';
import { CalenderSchedulerComponent } from './calender-scheduler/calender-scheduler.component';
import { CalenderRoutingModule } from './calender-routing.module';


@NgModule({
  declarations: [CalenderComponent, CalenderListComponent, CalenderSchedulerComponent],
  imports: [
    CalenderRoutingModule,
    SharedModule
  ]
})
export class CalenderModule { }
