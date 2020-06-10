// import { Injectable, OnInit } from '@angular/core';
// import { BaseDataService } from '../../shared/services/base-data.service';
// import { Observable, throwError, Subject } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';
// import { CountryData } from '../../shared/models/country-data';


// @Injectable()
// export class RegisterService {

//   constructor(private baseDataService: BaseDataService) {
//   }

//   getCountries(): Observable<CountryData[]> {
//     const url = `Account/InitRegistrationPage`;
//     return this.baseDataService.get(url)
//       .pipe(
//         map(responseData => {
//           return responseData.ResultData.AllCountriesWithDefaultselected;
//         }),
//         catchError(errorRes => {
//           return throwError(errorRes);
//         })
//       );
//   }

//   isEmailAvailable(value): Observable<boolean> {
//     const url = `Account/RegisterationEmailAvailable?email=${value}`;
//     return this.baseDataService.get(url)
//       .pipe(
//         map(responseData => {
//           return responseData.ResultData;
//         }),
//         catchError(errorRes => {
//           return throwError(errorRes);
//         })
//       );
//   }

//   register(value): Observable<any> {
//     const url = `Account/Register`;
//     return this.baseDataService.create(url, value)
//       .pipe(
//         map(responseData => {
//           console.log('responseData', responseData);
//           return responseData.ResultData;
//         }),
//         catchError(errorRes => {
//           return throwError(errorRes);
//         })
//       );
//   }

// }
