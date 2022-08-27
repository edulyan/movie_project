import { UserRole } from '../entity/user.entity';

export class UserMovieIdsDto {
  readonly userId: string;
  readonly movieId: string;
}

export class ChangeRoleDto {
  readonly userId: string;
  readonly role: UserRole;
}
