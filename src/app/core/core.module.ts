import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StorageService } from './services/storage.service';
import { RefreshTokenInterceptor } from '../interceptor/refresh-token.interceptor';
import { JwtInterceptor } from '../interceptor/jwt.interceptor';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ]
})
export class CoreModule {}

