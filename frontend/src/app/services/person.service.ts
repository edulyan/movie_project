import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreatePerson } from '../models/person/createPerson.interface';
import { IPerson } from '../models/person/person.interface';
import { IUpdatePerson } from '../models/person/updatePerson.interface';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private URL_PERSON = 'http://localhost:3000/person';

  constructor(private http: HttpClient) {}

  getById(id: string): Observable<IPerson> {
    return this.http.get<IPerson>(`${this.URL_PERSON}/${id}`);
  }

  createPerson(personDto: ICreatePerson): Observable<IPerson> {
    return this.http.post<IPerson>(`${this.URL_PERSON}`, personDto);
  }

  updatePerson(id: string, updDto: IUpdatePerson): Observable<IPerson> {
    return this.http.put<IPerson>(`${this.URL_PERSON}/${id}`, updDto);
  }

  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL_PERSON}/${id}`);
  }
}
