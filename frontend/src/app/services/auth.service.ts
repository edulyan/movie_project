import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { IAuth, IJwtToken } from '../models/auth/auth.interface';
import { ICreateUser } from '../models/user/createUser.interface';
import { IUser, IUserToken } from '../models/user/user.interface';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL_AUTH = 'http://localhost:3000/auth';
  private userSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<string>(
      JSON.parse(localStorage.getItem('token')!)
    );
    // console.log(this.userSubject.value);
  }

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
          localStorage.setItem('token', JSON.stringify(token.token));
          this.userSubject.next(token.token);
          return token;
        })
      );
  }

  signUp(createUser: ICreateUser) {
    return this.http.post<IUser>(
      `${this.URL_AUTH}/register`,
      createUser
    ) as Observable<IUser>;
  }

  getUserCookie() {
    return this.http.get<IUser>(`${this.URL_AUTH}/user`, {
      withCredentials: true,
    });
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

  getToken(): string {
    return this.userSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getDecodedToken(): IJwtToken {
    let token = localStorage.getItem('token')!;
    return jwt_decode(token);
  }
}
