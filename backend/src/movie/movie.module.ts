import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../comment/entity/comment.entity';
import { Movie } from './entity/movie.entity';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { FileModule } from '../file/file.module';
import { AuthModule } from '../auth/auth.module';
import { ActorToMovie } from './entity/actorToMovie.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  exports: [MovieService],
  imports: [
    TypeOrmModule.forFeature([Movie, Comment, ActorToMovie]),
    FileModule,
    AuthModule,
  ],
})
export class MovieModule {}
