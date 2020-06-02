
import { LayoutComponent } from '../layout/layout.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../navigation/header/header.component';
import { SidenavListComponent } from '../navigation/sidenav-list/sidenav-list.component';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { DialogService } from './services/dialog.service';
import { PeopleService } from '../people/people.service';
import { GroupsService } from '../groups/groups.service';
import { RegisterService } from '../register/register.service';

import { CalenderService } from '../calender/calender.service';
import { PeopleAddDialogComponent } from '../people/people-add-dialog/people-add-dialog.component';
import { PeopleViewDialogComponent } from '../people/people-view-dialog/people-view-dialog.component';

import { GroupsViewDialogComponent } from '../groups/groups-view-dialog/groups-view-dialog.component';
import { GroupsAddDialogComponent } from '../groups/groups-add-dialog/groups-add-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { CustomDatePipe } from './pipes/custom-date.pipe';

import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { AppListPeopleComponent } from './components/list-people/list-people.component';
import { OnlyNumberDirective } from './directives/only-number.directive';

import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/shared/components/format-datepicker/format-datepicker.component';


export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (isSubmitted)); // control.dirty || control.touched ||
  }
}

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    SidenavListComponent,
    AppListPeopleComponent,

    PeopleAddDialogComponent,
    PeopleViewDialogComponent,

    GroupsViewDialogComponent,
    GroupsAddDialogComponent,

    DeleteDialogComponent,

    CustomDatePipe,

    OnlyNumberDirective

  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule ,
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
    LayoutComponent,
    AppListPeopleComponent,
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    TranslateModule,
    OnlyNumberDirective
  ],
  providers: [
    DialogService,
    PeopleService,
    GroupsService,
    RegisterService,
    CalenderService,
    {provide: ErrorStateMatcher, useClass: MyErrorStateMatcher},
    {provide: DateAdapter, useClass: AppDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS}
    ],
  bootstrap: [],
  schemas: []
})
export class SharedModule { }
