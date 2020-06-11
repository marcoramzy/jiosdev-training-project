import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: GroupsComponent }]),
    SharedModule
  ],
})
export class GroupsModule { }
