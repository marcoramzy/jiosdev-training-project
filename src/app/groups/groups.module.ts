import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GroupsComponent } from './groups.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GroupsComponent }]),
    SharedModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class GroupsModule { }
