import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/entity/comment.entity';
import { Movie } from './entity/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { FileModule } from '../file/file.module';
import { AuthModule } from '../auth/auth.module';
import { MoviePerson } from '../movie-person/entity/personToMovie.entity';
import { PersonModule } from '../person/person.module';
import { UserFavMovies } from '../user-fav-movies/entity/userFavMovies.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
  imports: [
    TypeOrmModule.forFeature([Movie, Comment, MoviePerson, UserFavMovies]),
    FileModule,
    AuthModule,
    forwardRef(() => PersonModule),
  ],
})
export class MovieModule {}
