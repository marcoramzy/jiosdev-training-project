import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core.module';
import { PeopleAddDialog } from './people/people-add-dialog/people-add-dialog.component';
import { GroupsAddDialog } from './groups/groups-add-dialog/groups-add-dialog.component';



@NgModule({
  declarations: [
    AppComponent,
    PeopleAddDialog,
    GroupsAddDialog, 
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    CoreModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
  ],
  entryComponents:[PeopleAddDialog,GroupsAddDialog],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
