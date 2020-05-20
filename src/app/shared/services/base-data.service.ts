import {
  HttpClient, HttpHeaders, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaseDataService {

  constructor(private http: HttpClient) { }

  getHttpOptions() {
    const httpsOptions =  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    return httpsOptions;
  }

  get(url: string): Observable<any> {
    return this.http.get<any>(url, this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  create(url: string, data: any): Observable<any> {
    return this.http.post(url, data, this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  edit(url: string, data: any): Observable<any> {
    return this.http.put(url, data, this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url, this.getHttpOptions())
    .pipe(catchError(this.handleError));
  }

  getById(url: string): Observable<any> {
    return this.http.get<any>(url, this.getHttpOptions())
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
