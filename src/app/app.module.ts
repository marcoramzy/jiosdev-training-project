import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from './core.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { PeopleAddDialog } from './people/people-add-dialog/people-add-dialog.component';
import { GroupsAddDialog } from './groups/groups-add-dialog/groups-add-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    PeopleAddDialog,
    GroupsAddDialog
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
  ],
  entryComponents:[PeopleAddDialog,GroupsAddDialog],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
