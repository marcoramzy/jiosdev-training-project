import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CalenderComponent } from './calender.component';
import { CalenderListComponent } from './calender-list/calender-list.component';
import { CalenderSchedulerComponent } from './calender-scheduler/calender-scheduler.component';


@NgModule({
  declarations: [CalenderComponent, CalenderListComponent, CalenderSchedulerComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: CalenderComponent,
      children: [{path:  '', component:  CalenderSchedulerComponent}, {path:  'list', component:  CalenderListComponent}]}
    ]),
    SharedModule,
  ]
})
export class CalenderModule { }
