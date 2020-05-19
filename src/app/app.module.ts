import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PeopleAddDialogComponent } from './people/people-add-dialog/people-add-dialog.component';
import { GroupsAddDialogComponent } from './groups/groups-add-dialog/groups-add-dialog.component';
import { GroupsDeleteDialogComponent } from './groups/groups-delete-dialog/groups-delete-dialog.component';
import { MaterialModule } from './material/material.module';
import { PeopleDeleteDialogComponent } from './people/people-delete-dialog/people-delete-dialog.component';
import { PeopleViewDialogComponent } from './people/people-view-dialog/people-view-dialog.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    PeopleAddDialogComponent,
    GroupsAddDialogComponent,
    GroupsDeleteDialogComponent,
    PeopleDeleteDialogComponent,
    PeopleViewDialogComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    CoreModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
        },
        defaultLanguage: 'en'
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
