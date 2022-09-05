import { UserRole } from '../../common/enums';

export class UserMovieIdsDto {
  readonly userId: string;
  readonly movieId: string;
}

export class ChangeRoleDto {
  readonly userId: string;
  readonly role: UserRole;
}
