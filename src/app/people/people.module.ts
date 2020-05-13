import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PeopleComponent } from './people.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core.module';

@NgModule({
  declarations: [PeopleComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: PeopleComponent }]),
    SharedModule,
    CoreModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
    CoreModule
  ]
})
export class PeopleModule { }
