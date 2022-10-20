import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ICreateFiles } from '../models/movie/createFile.interface';
import { ICreateMovie } from '../models/movie/createMovie.interface';
import { IMovie } from '../models/movie/movie.interface';
import { IUpdateMovie } from '../models/movie/updateMovie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private URL_MOVIE = 'http://localhost:3000/movie';

  constructor(private http: HttpClient) {}

  getAll(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.URL_MOVIE}?count=10&offset=0`);
  }

  search(title: string): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(`${this.URL_MOVIE}/search?title=${title}`);
  }

  getById(id: string): Observable<IMovie> {
    return this.http.get<IMovie>(`${this.URL_MOVIE}/${id}`, {
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token')!)}`,
      },
      withCredentials: true,
    });
  }

  getMovieActors(id: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.URL_MOVIE}/movieActors/${id}`).pipe(
      map((data: string[]) => {
        let actorList: string[] = data;
        return actorList;
      })
    );
  }

  createMovie(
    createFiles: ICreateFiles,
    movieDto: ICreateMovie
  ): Observable<IMovie> {
    return this.http.post<IMovie>(`${this.URL_MOVIE}`, {
      createFiles,
      movieDto,
    });
  }

  updateMovie(
    id: string,
    updateMovie: IUpdateMovie
  ): Observable<IMovie | void> {
    return this.http.put<IMovie>(`${this.URL_MOVIE}/${id}`, updateMovie);
  }

  deleteMovie(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.URL_MOVIE}/${id}`);
  }
}
