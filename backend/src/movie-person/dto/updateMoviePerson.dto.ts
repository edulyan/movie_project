import { MoviePersonTypeEnum } from '../../common/enums';

export class UpdateMoviePersonDto {
  readonly movieId?: string;
  readonly personId?: string;
  readonly type?: MoviePersonTypeEnum;
}
