import { NgModule } from '@angular/core';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register/register-form/register-form.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, LoginFormComponent, RegisterComponent, RegisterFormComponent],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {}
