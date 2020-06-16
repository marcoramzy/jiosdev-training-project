import {
  HttpClient, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class BaseDataService {

  baseUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) { }

  getHttpOptions() {
    const httpsOptions =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      })
    };
    return httpsOptions;
  }

  get(url: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + url , this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  create(url: string, data: any): Observable<any> {
    return this.http.post(this.baseUrl + url , data, this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  edit(url: string, data: any): Observable<any> {
    return this.http.put( this.baseUrl + url , data, this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  delete(url: string): Observable<any> {
    return this.http.delete( this.baseUrl + url , this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  getById(url: string): Observable<any> {
    return this.http.get<any>( this.baseUrl + url , this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
