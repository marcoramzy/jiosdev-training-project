import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GroupsComponent } from './groups.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: GroupsComponent }]),
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class GroupsModule { }
