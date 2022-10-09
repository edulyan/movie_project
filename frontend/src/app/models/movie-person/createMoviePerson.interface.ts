import { MoviePersonTypeEnum } from 'src/app/enums/enums';

export interface ICreateMoviePerson {
  movieId: string;
  personId: string;
  type: MoviePersonTypeEnum;
}
