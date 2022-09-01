import { UserRole } from '../src/user/entity/user.entity';
import { ChangeRoleDto } from '../src/user/dto/add-change.dto';
import { UserDto } from '../src/user/dto/user.dto';
import { CreateMovieDto } from '../src/movie/dto/createMovie.dto';
import { Genre } from '../src/movie/entity/movie.entity';

export const createUserTest: UserDto = {
  firstName: 'Oleg',
  lastName: 'Ivanovich',
  email: 'Oleg@mail.ru',
  password: '20012002',
};

export const changeRoleToUserTest: ChangeRoleDto = {
  userId: 'lock',
  role: UserRole.ADMIN,
};

export const createMovieTest: CreateMovieDto = {
  title: 'Insidious',
  genre: [Genre.HORROR],
};

export const filesTest = {
  image: 'movie_website/image/Oblivion.png',
  video: 'movie_website/video/Обливион.mp4',
};
