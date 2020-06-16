import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { StorageService } from '../core/services/storage.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
    urlsToNotUse: Array<string>;

    constructor(private authService: AuthService, private storageService: StorageService) {
        this.urlsToNotUse = [
            'RefreshUserToken'
        ];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isValidRequestForInterceptor(request.url)) {
            return from(this.authService.getToken())
                .pipe(
                    switchMap(token => {

                        if (token?.expiry_date) {
                            const dateNow = new Date();
                            const expirationDate = new Date(token.expiry_date);

                            if ( (token.expiry_date != null) && (dateNow > expirationDate)) {
                                console.log('token expiry_date: ', token.expiry_date);
                                console.log('token refresh_token: ', token.refresh_token);
                                console.log('token access_token: ', token.access_token);

                                return from(this.authService.getRefreshUserToken(token.refresh_token, token.access_token))
                                    .pipe(
                                        switchMap(res => {
                                            return next.handle(request);
                                }));

                            }
                            else {
                                return next.handle(request);
                            }

                        }
                        else {
                            return next.handle(request);
                        }

                    })
                );
        }
        return next.handle(request);
    }

    private isValidRequestForInterceptor(requestUrl: string): boolean {
        const positionIndicator = 'Account/';
        const position = requestUrl.indexOf(positionIndicator);
        if (position > 0) {

            const destination: string = requestUrl.substr(position + positionIndicator.length);

            for (const address of this.urlsToNotUse) {
                if (new RegExp(address).test(destination)) {
                    return false;
                }
            }
        }
        return true;
    }
}
