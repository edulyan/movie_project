import { Module } from '@nestjs/common';
import { UserFavMoviesService } from './user-fav-movies.service';
import { UserFavMoviesController } from './user-fav-movies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFavMovies } from './entity/userFavMovies.entity';
import { User } from '../user/entity/user.entity';
import { Movie } from '../movie/entity/movie.entity';
import { MovieModule } from '../movie/movie.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [UserFavMoviesService],
  controllers: [UserFavMoviesController],
  exports: [UserFavMoviesService],
  imports: [
    TypeOrmModule.forFeature([UserFavMovies, User, Movie]),
    MovieModule,
    UserModule,
  ],
})
export class UserFavMoviesModule {}
