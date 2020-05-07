import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PeopleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: PeopleComponent }]),

  ]
})
export class PeopleModule { }
