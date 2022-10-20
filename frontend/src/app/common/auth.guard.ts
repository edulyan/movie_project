import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs';
import { IJwtToken } from '../models/auth/auth.interface';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user: IJwtToken = this.authService.getDecodedToken();

    console.log(user.role);

    if (user) {
      // check if route is restricted by role
      if (route.data['roles'] && route.data['roles'] != user.role) {
        // role not authorised so redirect to home page
        this.router.navigate(['/home']);
        console.log('role not authorised so redirect to home page');

        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    console.log('not logged in so redirect to login page with the return url');

    return false;
  }
}
