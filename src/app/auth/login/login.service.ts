// import { Injectable } from '@angular/core';
// import { BaseDataService } from '../../shared/services/base-data.service';
// import { Observable, throwError, Subject } from 'rxjs';
// import { map, catchError } from 'rxjs/operators';


// @Injectable()
// export class LoginService {

//   constructor(private baseDataService: BaseDataService) {
//   }

//   login(value): Observable<any> {
//     const url = `Account/Login`;
//     return this.baseDataService.create(url, value)
//       .pipe(
//         map(responseData => {
//           console.log('responseData', responseData);

//           return responseData;
//         }),
//         catchError(errorRes => {
//           return throwError(errorRes);
//         })
//       );
//   }

// }
