import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail({ message: 'Invalid email format' })
  readonly email: string;

  @MinLength(5, {
    message: 'Password is too short',
  })
  @MaxLength(120, {
    message: 'Password is too long',
  })
  readonly password: string;
}
