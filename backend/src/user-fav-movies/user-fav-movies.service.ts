import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserMovieIdsDto } from '../common/dto';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';
import { CreateUserFavMoviesDto } from './dto/createUserFavMov.dto';
import { UpdateUserFavMoviesDto } from './dto/updateUserFavMov.dto';
import { UserFavMovies } from './entity/userFavMovies.entity';

@Injectable()
export class UserFavMoviesService {
  constructor(
    @InjectRepository(UserFavMovies)
    private userFavMoviesRepo: Repository<UserFavMovies>,
    private userService: UserService,
    private movieService: MovieService,
  ) {}

  async getById(id: string): Promise<UserFavMovies> {
    const userFavMov = await this.userFavMoviesRepo.findOne(id);

    if (!userFavMov) {
      throw new HttpException(
        'Такого фильма в "любимых" нет',
        HttpStatus.NOT_FOUND,
      );
    }

    return userFavMov;
  }

  async createUserFavMovie(
    createDto: CreateUserFavMoviesDto,
  ): Promise<UserFavMovies> {
    await this.userService.getById(createDto.userId);
    await this.movieService.getById(createDto.movieId);

    const newUserFavMov = await this.userFavMoviesRepo.create(createDto);
    return await this.userFavMoviesRepo.save(newUserFavMov);
  }

  async updateMovieFromFav(
    id: string,
    updDto: UpdateUserFavMoviesDto,
  ): Promise<boolean> {
    await this.getById(id);

    await this.userFavMoviesRepo.update(id, updDto);

    return true;
  }

  async deleteMovieFromFav(IDs: UserMovieIdsDto): Promise<boolean> {
    const { userId, movieId } = IDs;

    const userFaMo = await this.userFavMoviesRepo.findOne({
      userId,
      movieId,
    });

    if (!userFaMo) {
      throw new HttpException(
        'Такого фильма нет в "любимых"',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.userFavMoviesRepo.delete(userFaMo.id);

    return true;
  }
}
