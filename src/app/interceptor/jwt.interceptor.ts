import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return from(this.authService.isLoggedIn())
            .pipe(
                switchMap(token => {

                    if (token?.access_token) {

                        return from(this.authService.getChurchServiceId())
                            .pipe(
                                switchMap(churchServiceId => {

                                    console.log('request', request);
                                    const newUrl = this.addServiceIdToReqUrl(request.url, churchServiceId);
                                    request = request.clone({ url: newUrl });

                                    console.log('JwtInterceptor token', token.access_token);

                                    const headers = request.headers.set('Authorization', 'Bearer ' + token.access_token);
                                    const requestClone = request.clone({
                                        headers
                                    });

                                    return next.handle(requestClone);
                        }));


                    }
                    else {
                        return next.handle(request);
                    }

                })
            );

    }

    private addServiceIdToReqUrl(requestUrl: string, serviceId: string): string {
        const apiBaseUrl = `${environment.apiBaseUrl}`;

        const positionIndicator = apiBaseUrl;
        const position = requestUrl.indexOf(positionIndicator);

        if (requestUrl.search(positionIndicator) !== -1) {

            const baseUrl: string = requestUrl.substr(0, position + positionIndicator.length);

            const restUrl: string = requestUrl.substr(position + positionIndicator.length);

            const newUrl = baseUrl + serviceId + '/' + restUrl;

            return newUrl;
        }
        return requestUrl;
    }

}
