import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CalenderComponent } from './calender.component';
import { CalenderListComponent } from './calender-list/calender-list.component';
import {ReactiveFormsModule } from '@angular/forms';
import { CalenderSchedulerComponent } from './calender-scheduler/calender-scheduler.component';


@NgModule({
  declarations: [CalenderComponent, CalenderListComponent, CalenderSchedulerComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: CalenderComponent,
      children: [{path:  '', component:  CalenderSchedulerComponent}, {path:  'list', component:  CalenderListComponent}]}
    ]),
    SharedModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CalenderModule { }
