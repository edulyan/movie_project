import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UserDto {
  @IsNotEmpty({
    message: 'Firstname is required',
  })
  @IsString({
    message: 'Firstname must be a string',
  })
  firstName: string;

  @IsNotEmpty({
    message: 'Lastname is required',
  })
  @IsString({
    message: 'Lastname must be a string',
  })
  lastName: string;

  @IsNotEmpty({
    message: 'Email is required',
  })
  @IsEmail({
    message: 'Invalid email format',
  })
  email: string;

  @IsNotEmpty({
    message: 'Password is required',
  })
  @MinLength(5, {
    message: 'Password is too short',
  })
  @MaxLength(100, {
    message: 'Password is too long',
  })
  password: string;
}
