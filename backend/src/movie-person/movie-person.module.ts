import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonToMovie } from './entity/personToMovie.entity';
import { MoviePersonController } from './movie-person.controller';
import { MoviePersonService } from './movie-person.service';
import { Movie } from '../movie/entity/movie.entity';
import { Person } from '../person/entity/person.entity';
import { MovieModule } from '../movie/movie.module';
import { PersonModule } from '../person/person.module';

@Module({
  controllers: [MoviePersonController],
  providers: [MoviePersonService],
  imports: [
    TypeOrmModule.forFeature([PersonToMovie, Movie, Person]),
    MovieModule,
    PersonModule,
  ],
})
export class MoviePersonModule {}
