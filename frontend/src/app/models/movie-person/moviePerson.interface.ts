import { MoviePersonTypeEnum } from 'src/app/enums/enums';
import { IMovie } from '../movie/movie.interface';
import { IPerson } from '../person/person.interface';

export interface IMoviePerson {
  id: string;
  movieId: string;
  personId: string;
  movie: IMovie;
  person: IPerson;
  type: MoviePersonTypeEnum;
}
