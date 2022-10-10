import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { MovieService } from '../movie/movie.service';
import { CreatePersonDto } from './dto/createPerson.dto';
import { Person } from './entity/person.entity';
import { PersonMovieIdsDto, UserMovieIdsDto } from '../common/dto';
import { PersonToMovie } from '../movie-person/entity/personToMovie.entity';
import { UpdatePersonDto } from './dto/updatePerson.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person) private personRepository: Repository<Person>,
    @InjectRepository(PersonToMovie)
    private personToMovieRepo: Repository<PersonToMovie>,
    @Inject(forwardRef(() => MovieService))
    private movieService: MovieService,
  ) {}

  async getById(id: string): Promise<Person> {
    const person = await this.personRepository.findOne(id, {
      relations: ['personToMovies'],
    });

    if (!person) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return person;
  }

  async createPerson(actorDto: CreatePersonDto): Promise<Person> {
    const person = await this.personRepository.create(actorDto);

    return await this.personRepository.save(person);
  }

  async updatePerson(
    id: string,
    updDto: UpdatePersonDto,
  ): Promise<UpdateResult> {
    await this.getById(id);

    return await this.personRepository.update(id, updDto);
  }

  async deletePerson(id: string): Promise<void> {
    await this.personRepository.delete(id);
  }
}
