import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateMoviePerson } from '../models/movie-person/createMoviePerson.interface';
import { IMoviePerson } from '../models/movie-person/moviePerson.interface';
import { IUpdateMoviePerson } from '../models/movie-person/updateMoviePerson.interface';

@Injectable({
  providedIn: 'root',
})
export class MoviePersonService {
  private URL_MOVIE_PERSON = 'http://localhost:3000/movie-person';

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<IMoviePerson> {
    return this.http.get<IMoviePerson>(`${this.URL_MOVIE_PERSON}/${id}`);
  }

  createMoviePerson(createDto: ICreateMoviePerson): Observable<IMoviePerson> {
    return this.http.post<IMoviePerson>(`${this.URL_MOVIE_PERSON}`, {
      createDto,
    });
  }

  updateMoviePerson(
    id: string,
    updDto: IUpdateMoviePerson
  ): Observable<IMoviePerson> {
    return this.http.put<IMoviePerson>(
      `${this.URL_MOVIE_PERSON}/${id}`,
      updDto
    );
  }

  deleteMoviePerson(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.URL_MOVIE_PERSON}/${id}`);
  }
}
