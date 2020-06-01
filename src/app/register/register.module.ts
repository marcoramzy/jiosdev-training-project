import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RegisterFormComponent } from './register-form/register-form.component';
import {ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent, RegisterFormComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: RegisterComponent }]),
    SharedModule,
    ReactiveFormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  exports: [
  ]
})
export class RegisterModule { }
