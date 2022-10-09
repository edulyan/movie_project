import { Country } from 'src/app/enums/enums';
import { IMoviePerson } from '../movie-person/moviePerson.interface';

export interface IPerson {
  id: string;
  name: string;
  birthday: Date;
  country: Country;
  personToMovies: IMoviePerson[];
}
