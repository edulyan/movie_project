import { UserRole } from './enums';

export class UserMovieIdsDto {
  readonly userId: string;
  readonly movieId: string;
}

export class ActorMovieIdsDto {
  readonly actorId: string;
  readonly movieId: string;
}

export class ChangeRoleDto {
  readonly userId: string;
  readonly role: UserRole;
}
