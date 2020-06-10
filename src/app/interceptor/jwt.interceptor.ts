import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token: string = localStorage.getItem('token');

        // if (token) {
        //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        // }

        // if (!request.headers.has('Content-Type')) {
        //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        // }

        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });


        ///////////////////////////////////////////////////////////////
        // let token: string = localStorage.getItem('token');


        // this.storageService.get('token').then(
        //     (res) => {
        //         console.log('JwtInterceptor token', res.access_token);
        //         token =  res.access_token;
        //         if (token) {
        //             request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        //         }
        //     }
        // );

        // return next.handle(request).pipe(
        //     map((event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) {
        //             console.log('JwtInterceptor event--->>>', event);
        //         }
        //         return event;
        // }));
        //////////////////////////////////////////////////

        return from(this.authService.isLoggedIn())
            .pipe(
                switchMap(token => {

                    if (token?.access_token) {
                        console.log('JwtInterceptor token', token.access_token);

                        const headers = request.headers.set('Authorization', 'Bearer ' + token.access_token);
                        //   .append('Content-Type', 'application/json');
                        const requestClone = request.clone({
                            headers
                        });
                        return next.handle(requestClone);
                    }
                    else{
                        return next.handle(request);
                    }

                })
            );

    }
}
