import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const authToken = this.authService.getToken();

    // const isLoggedIn = authToken && authToken;
    const isApiUrl = request.url.startsWith('http://localhost:4200');
    if (authToken && isApiUrl) {
      const authReq = request.clone({
        headers: request.headers.set(
          'Authorization',
          `Bearer ${localStorage.getItem('token')}`
        ),
      });

      return next.handle(authReq);
    }

    // console.log(request);

    return next.handle(request);
  }
}
