import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../entity/movie.entity';

export class MovieDto {
  @IsNotEmpty({
    message: 'Firstname is required',
  })
  @IsString({
    message: 'Firstname must be a string',
  })
  readonly title: string;

  @IsNotEmpty({
    message: 'Genre is required',
  })
  @IsString({
    each: true,
    message: 'Genre must be a string',
  })
  @IsEnum(Genre, { message: 'This genre does not exist' })
  readonly genre: Genre[];
}
