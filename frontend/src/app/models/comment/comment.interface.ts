import { IMovie } from '../movie/movie.interface';
import { IUser } from '../user/user.interface';

export interface IComment {
  id: string;
  text: string;
  rating: number;
  movie: IMovie;
  user: IUser;
  createdDate: Date;
  updateDate: Date;
}
