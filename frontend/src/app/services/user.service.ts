import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMovie } from '../models/movie/movie.interface';
import {
  IChangeRole,
  IUserMovieIds,
} from '../models/user/changesUser.interface';
import { IUpdateUser } from '../models/user/updateUser.interface';
import { IUser } from '../models/user/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private URL_USER = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.URL_USER}`);
  }

  getById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.URL_USER}/${id}`);
  }

  getFavorites(id: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.URL_USER}/favorites/${id}`);
  }

  addMovieToFav(userMovieIds: IUserMovieIds): Observable<IUser> {
    return this.http.post<IUser>(
      `${this.URL_USER}/addMovieToFav`,
      userMovieIds
    );
  }

  changeUserRole(changeRole: IChangeRole) {
    return this.http.post<any>(`${this.URL_USER}/changeUserRole`, changeRole);
  }

  updateUser(id: string, updateUser: IUpdateUser): Observable<IUser | void> {
    return this.http.put<IUser>(`${this.URL_USER}/${id}`, updateUser);
  }

  removeMovieFromFav(userMovieIds: IUserMovieIds) {
    return this.http
      .delete<any>(`${this.URL_USER}/removeMovieFromFav`, {
        body: userMovieIds,
      })
      .subscribe();
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.URL_USER}/${id}`);
  }
}
