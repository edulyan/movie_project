import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUpdateUserFavMovie } from '../models/user-fav-movie/updateUserFavMovie.dto';
import { IUserFavMovie } from '../models/user-fav-movie/userFavMovie.interface';
import { IUserMovieIds } from '../models/user/changesUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserFavMoviesService {
  private URL_UFM = 'http://localhost:3000/user-fav-movie';

  constructor(private http: HttpClient) {}

  addUserFavMovie(IDs: IUserMovieIds): Observable<IUserFavMovie> {
    return this.http.post<IUserFavMovie>(
      `${this.URL_UFM}`,
      {
        userId: IDs.userId,
        movieId: IDs.movieId,
      },
      {
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
        },
        withCredentials: true,
      }
    );
  }

  updateUserFavMovie(
    id: string,
    updDto: IUpdateUserFavMovie
  ): Observable<boolean> {
    return this.http.put<boolean>(`${this.URL_UFM}/${id}`, {
      userId: updDto?.userId,
      movieId: updDto?.movieId,
      isSelected: updDto?.isSelected,
    });
  }

  removeUserFavMovie(IDs: IUserMovieIds): Observable<boolean> {
    return this.http.delete<boolean>(`${this.URL_UFM}`, {
      body: IDs,
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
      },
      withCredentials: true,
    });
  }
}
