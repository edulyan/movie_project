import { UserRole } from 'src/app/enums/enums';

export interface IUserMovieIds {
  userId: string;
  movieId: string;
}

export interface IChangeRole {
  userId: string;
  role: UserRole;
}
