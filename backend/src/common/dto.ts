import { UserRole } from './enums';

export class UserMovieIdsDto {
  readonly userId: string;
  readonly movieId: string;
}

export class PersonMovieIdsDto {
  readonly personId: string;
  readonly movieId: string;
}

export class ChangeRoleDto {
  readonly userId: string;
  readonly role: UserRole;
}

export class SubscribeDto {
  readonly userId: string;
  readonly planId: string;
}
