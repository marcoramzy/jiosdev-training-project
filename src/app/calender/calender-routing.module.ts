import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalenderComponent } from './calender.component';
import { CalenderSchedulerComponent } from './calender-scheduler/calender-scheduler.component';
import { CalenderListComponent } from './calender-list/calender-list.component';


const routes: Routes = [
  { path: '', component: CalenderComponent,
  children: [{path:  '', component:  CalenderSchedulerComponent}, {path:  'list', component:  CalenderListComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalenderRoutingModule { }
