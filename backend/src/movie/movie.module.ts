import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/entity/comment.entity';
import { Movie } from './entity/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { FileModule } from '../file/file.module';
import { AuthModule } from '../auth/auth.module';
import { PersonToMovie } from '../movie-person/entity/personToMovie.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
  imports: [
    TypeOrmModule.forFeature([Movie, Comment, PersonToMovie]),
    FileModule,
    AuthModule,
  ],
})
export class MovieModule {}
