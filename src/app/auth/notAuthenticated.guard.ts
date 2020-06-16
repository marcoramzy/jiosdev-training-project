import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({ providedIn: 'root' })
export class NotAuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService , private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.getToken().then((getToken) => {
        if (!getToken) {
          console.log('Is not logged in');
          return true;
        } else {
            console.log('Is logged in');
            this.router.navigate(['/dashboard']);
        }
    });

  }
}
