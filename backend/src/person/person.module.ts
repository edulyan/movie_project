import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController } from './person.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from '../movie/movie.module';
import { Person } from './entity/person.entity';
import { PersonToMovie } from '../movie-person/entity/personToMovie.entity';

@Module({
  providers: [PersonService],
  controllers: [PersonController],
  exports: [PersonService],
  imports: [TypeOrmModule.forFeature([Person, PersonToMovie]), MovieModule],
})
export class PersonModule {}
