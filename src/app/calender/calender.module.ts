import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CalenderComponent } from './calender.component';
import { CalenderListComponent } from './calender-list/calender-list.component';

@NgModule({
  declarations: [CalenderComponent, CalenderListComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: CalenderComponent }]),
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class CalenderModule { }
