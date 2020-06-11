import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PeopleOldComponent } from './people-old.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PeopleOldComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: PeopleOldComponent }]),
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class PeopleOldModule { }
