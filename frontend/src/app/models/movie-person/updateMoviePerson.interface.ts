import { MoviePersonTypeEnum } from 'src/app/enums/enums';

export interface IUpdateMoviePerson {
  movieId?: string;
  personId?: string;
  type?: MoviePersonTypeEnum;
}
