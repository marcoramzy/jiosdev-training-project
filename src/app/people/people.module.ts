import { NgModule } from '@angular/core';
import { PeopleComponent } from './people.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [PeopleComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: PeopleComponent }]),
    SharedModule
  ],
})
export class PeopleModule { }
