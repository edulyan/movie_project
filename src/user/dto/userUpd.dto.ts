import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserRole } from '../entity/user.entity';

export class UserDtoUpd {
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

  @IsString({
    message: 'Role must be a string',
  })
  @IsEnum(UserRole, { message: 'This role does not exist' })
  role: UserRole;
}
