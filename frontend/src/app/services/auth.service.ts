import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IAuth } from '../models/auth/auth.interface';
import { ICreateUser } from '../models/user/createUser.interface';
import { IUser } from '../models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL_AUTH = 'http://localhost:3000/auth';

  constructor(private http: HttpClient) {}

  signIn(authDto: IAuth) {
    return this.http
      .post<any>(
        `${this.URL_AUTH}/login`,
        {
          email: authDto.email,
          password: authDto.password,
        },
        { withCredentials: true }
      )
      .pipe(
        map((token) => {
          localStorage.setItem('token', token.access_token);
          return token;
        }),
        shareReplay()
      );
  }

  signUp(createUser: ICreateUser) {
    return this.http.post<IUser>(
      `${this.URL_AUTH}/register`,
      createUser
    ) as Observable<IUser>;
  }

  // logOut() {
  //   localStorage.removeItem('token');
  // }

  logout() {
    return this.http.post(
      `${this.URL_AUTH}/logout`,
      {},
      { withCredentials: true }
    );
  }

  forgotPass(authDto: IAuth) {
    return this.http.post<IUser>(`${this.URL_AUTH}/forgotPass`, authDto);
  }

  getToken() {
    try {
      return localStorage.getItem('token');
    } catch (err) {
      return err;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
