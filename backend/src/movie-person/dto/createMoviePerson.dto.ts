import { MoviePersonTypeEnum } from '../../common/enums';

export class CreateMoviePersonDto {
  readonly movieId: string;
  readonly personId: string;
  readonly type: MoviePersonTypeEnum;
}
