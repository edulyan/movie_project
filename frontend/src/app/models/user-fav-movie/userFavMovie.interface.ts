import { IMovie } from '../movie/movie.interface';
import { IUser } from '../user/user.interface';

export interface IUserFavMovie {
  id: string;
  userId: string;
  movieId: string;
  user: IUser;
  movie: IMovie;
  isSelected: boolean;
}
