import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../../common/enums';

export class UpdateMovieDto {
  @IsNotEmpty({
    message: 'Firstname is required',
  })
  @IsString({
    message: 'Firstname must be a string',
  })
  readonly title?: string;

  @IsNotEmpty({
    message: 'Description is required',
  })
  @IsString({
    message: 'Description must be a string',
  })
  readonly description?: string;

  readonly director?: string;

  readonly year?: number;

  readonly ageRating?: string;

  readonly runTime?: string;

  readonly budget?: number;

  readonly averageRating?: number;

  readonly voteCount?: number;

  @IsNotEmpty({
    message: 'Genre is required',
  })
  @IsString({
    each: true,
    message: 'Genre must be a string',
  })
  @IsEnum(Genre, { message: 'This genre does not exist' })
  readonly genre?: Genre[];
}
