import { UserRole } from 'src/app/enums/enums';

export interface IUpdateUser {
  firstname: string;
  lastname: string;
  email: string;
  role: UserRole;
}
