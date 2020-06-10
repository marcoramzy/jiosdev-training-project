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
            // 'myController1/myAction1/.+'
            // 'A7640AB420A47E4C/Account/RefreshUserToken'
            'RefreshUserToken'
            // 'GetCurrentUserSettings'
        ];
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.isValidRequestForInterceptor(request.url)) {
            return from(this.authService.isLoggedIn())
                .pipe(
                    switchMap(token => {

                        if (token?.expiry_date) {
                            const dateNow = new Date();
                            const expirationDate = new Date(token.expiry_date);

                            if ( (token.expiry_date != null) && (dateNow > expirationDate)) { // (token.expiry_date != null) &&
                                console.log('RefreshTokenInterceptor expiryDate ', token.expiry_date);
                                console.log('token.refresh_token ', token.refresh_token);
                                console.log('token.access_token ', token.access_token);

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
        console.log('requestUrl', requestUrl);
        const positionIndicator = 'Account/';
        // const positionIndicator = '';
        const position = requestUrl.indexOf(positionIndicator);
        console.log('position', position);
        if (position > 0) {
            console.log('bf destination');

            const destination: string = requestUrl.substr(position + positionIndicator.length);
            console.log('destination', destination);

            for (const address of this.urlsToNotUse) {
                if (new RegExp(address).test(destination)) {
                    console.log('FALSE');
                    return false;
                }
            }
        }
        return true;
    }
}
