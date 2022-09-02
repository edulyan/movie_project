import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
      .post<any>(`${this.URL_AUTH}/login`, {
        email: authDto.email,
        password: authDto.password,
      })
      .pipe(
        map((token) => {
          localStorage.setItem('token', token.access_token);
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

  logOut() {
    localStorage.removeItem('token');
  }

  forgotPass(authDto: IAuth) {
    return this.http.post<IUser>(`${this.URL_AUTH}/forgotPass`, authDto);
  }
}
