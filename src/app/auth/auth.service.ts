import { Injectable } from '@angular/core';
import { User } from './user.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { BaseDataService } from '../shared/services/base-data.service';
import { CountryData } from '../shared/models/country-data';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from '../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private router: Router , private storageService: StorageService, private baseDataService: BaseDataService) {}

  public logout(){
    this.storageService.remove('token');
    this.storageService.remove('church_service_id');

    this.router.navigate(['/Account']);
  }

  public isLoggedIn(){
    return this.storageService.get('token');
  }

  getChurchServiceId(){
    return this.storageService.get('church_service_id');
  }

  getRefreshUserToken(refreshToken, accessToken){
    const url = `Account/RefreshUserToken`;
    return this.baseDataService.create(url, { Key : refreshToken , Value : accessToken }).toPromise().then(
        (res) => {
          if (res.Type === 'success'){
            console.log('HEREEEEEEEE', res);
            this.setNewToken(JSON.parse(res.ResultData));

          }

        }
    );
  }

  setNewToken(token){
    const initialDate = new Date();
    const expiryDate  = new Date(initialDate.setSeconds(initialDate.getSeconds() + token.expires_in));

    const newToken =  token;
    newToken.expiry_date = expiryDate;
    console.log('newToken', newToken);

    this.storageService.set('token', newToken);
  }

  getCurrentUserSettings(){
    const url = `Account/GetCurrentUserSettings`;
    return this.baseDataService.get(url);
  }

  getCountries(): Observable<CountryData[]> {
    const url = `Account/InitRegistrationPage`;
    return this.baseDataService.get(url)
      .pipe(
        map(responseData => {
          return responseData.ResultData.AllCountriesWithDefaultselected;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  isEmailAvailable(value): Observable<boolean> {
    const url = `Account/RegisterationEmailAvailable?email=${value}`;
    return this.baseDataService.get(url)
      .pipe(
        map(responseData => {
          return responseData.ResultData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  register(value): Observable<any> {
    const url = `Account/Register`;
    return this.baseDataService.create(url, value)
      .pipe(
        map(responseData => {
          console.log('responseData', responseData);
          return responseData.ResultData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }

  login(value): Observable<any> {
    const url = `Account/Login`;
    return this.baseDataService.create(url, value)
      .pipe(
        map(responseData => {
          console.log('responseData', responseData);

          return responseData;
        }),
        catchError(errorRes => {
          return throwError(errorRes);
        })
      );
  }


}
