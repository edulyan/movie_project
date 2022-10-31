import { UserRole } from 'src/app/enums/enums';
import { IComment } from '../comment/comment.interface';
import { IMovie } from '../movie/movie.interface';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isSubscribed: boolean;
  role: UserRole;
  comments: IComment[];
  ratedToMovies: IMovie[];
  favorites: IMovie[];
  createdDate: Date;
  updatedDate: Date;
}

export interface IUserToken {
  id: string;
  firstname: string;
  lastName: string;
  email: string;
  isSubscribed: boolean;
  role: UserRole;
  favorites: IMovie[];
  createdDate: Date;
  updatedDate: Date;
  token: string;
}
