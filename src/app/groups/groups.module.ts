import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupsComponent } from './groups.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: GroupsComponent }]),

  ]
})
export class GroupsModule { }
