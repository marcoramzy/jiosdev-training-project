
import { LayoutComponent } from '../layout/layout.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import {  CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../navigation/header/header.component';
import { SidenavListComponent } from '../navigation/sidenav-list/sidenav-list.component';
////

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedTableComponent } from './shared-table/shared-table.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    SharedTableComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule 
  ],
  exports: [
    LayoutComponent,
    SharedTableComponent,

    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
