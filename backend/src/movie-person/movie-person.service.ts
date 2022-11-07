import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { MoviePerson } from './entity/personToMovie.entity';
import { PersonService } from '../person/person.service';
import { MovieService } from '../movie/movie.service';
import { CreateMoviePersonDto } from './dto/createMoviePerson.dto';
import { UpdateMoviePersonDto } from './dto/updateMoviePerson.dto';

@Injectable()
export class MoviePersonService {
  constructor(
    @InjectRepository(MoviePerson)
    private moviePersonRepository: Repository<MoviePerson>,
    private movieService: MovieService,
    private personService: PersonService,
  ) {}

  async getById(id: string): Promise<MoviePerson> {
    const moviePerson = await this.moviePersonRepository.findOne(id);

    if (!moviePerson) {
      throw new HttpException(
        'Такого человека в фильме не найдено',
        HttpStatus.NOT_FOUND,
      );
    }

    return moviePerson;
  }

  async createMoviePerson(
    createDto: CreateMoviePersonDto,
  ): Promise<MoviePerson> {
    const { movieId, personId } = createDto;
    await this.movieService.getById(movieId);
    await this.personService.getById(personId);

    const moviePerson = await this.moviePersonRepository.findOne({
      movieId,
      personId,
    });

    if (moviePerson) {
      throw new HttpException(
        'Такой человек уже есть в фильме',
        HttpStatus.CONFLICT,
      );
    }

    const newPerson = await this.moviePersonRepository.create(createDto);
    return await this.moviePersonRepository.save(newPerson);
  }

  async updateMoviePerson(
    id: string,
    updDto: UpdateMoviePersonDto,
  ): Promise<UpdateResult> {
    await this.getById(id);

    return await this.moviePersonRepository.update(id, updDto);
  }

  async deleteMoviePerson(id: string): Promise<boolean> {
    const moviePerson = await this.moviePersonRepository.findOne(id);

    if (!moviePerson) {
      throw new HttpException(
        'Такого человека в фильме не найдено',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.moviePersonRepository.delete(id);

    return true;
  }
}
