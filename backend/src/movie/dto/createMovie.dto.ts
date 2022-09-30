import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Country, Genre } from '../../common/enums';

export class CreateMovieDto {
  @IsNotEmpty({
    message: 'Firstname is required',
  })
  @IsString({
    message: 'Firstname must be a string',
  })
  readonly title: string;

  @IsNotEmpty({
    message: 'Description is required',
  })
  @IsString({
    message: 'Description must be a string',
  })
  readonly description: string;

  readonly director: string;

  readonly year: number;

  readonly ageRating: string;

  readonly runTime: string;

  readonly budget: number;

  @IsNotEmpty({
    message: 'Country is required',
  })
  @IsString({
    each: true,
    message: 'Country must be a string',
  })
  // @IsEnum(Country, { message: 'This country does not exist' })
  readonly country: Country[];

  @IsNotEmpty({
    message: 'Genre is required',
  })
  @IsString({
    each: true,
    message: 'Genre must be a string',
  })
  // @IsEnum(Genre, { message: 'This genre does not exist' })
  readonly genre: Genre[];
}
