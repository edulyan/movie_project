import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieService } from '../movie/movie.service';
import { CreateActorDto } from './dto/createActor.dto';
import { Actor } from './entity/actor.entity';
import { ActorMovieIdsDto, UserMovieIdsDto } from '../common/dto';
import { ActorToMovie } from '../movie/entity/actorToMovie.entity';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor) private actorRepository: Repository<Actor>,
    @InjectRepository(ActorToMovie)
    private actorToMovieRepo: Repository<ActorToMovie>,
    private movieService: MovieService,
  ) {}

  async getActorById(id: string): Promise<Actor> {
    const actor = await this.actorRepository.findOne(id, {
      relations: ['actorToMovies'],
    });

    if (!actor) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return actor;
  }

  async createActor(actorDto: CreateActorDto): Promise<Actor> {
    const actor = await this.actorRepository.create(actorDto);

    return await this.actorRepository.save(actor);
  }

  async addActorToMovie(idsDto: ActorMovieIdsDto) {
    const movie = await this.movieService.getById(idsDto.movieId);
    const actor = await this.actorRepository.findOne(idsDto.actorId);

    if (!actor) {
      throw new HttpException('Actor not found', HttpStatus.NOT_FOUND);
    }

    const relation = this.actorToMovieRepo.create({
      movieId: movie.id,
      actorId: actor.id,
      movie: movie,
      actor: actor,
    });

    return await this.actorToMovieRepo.save(relation);
  }

  async deleteActor(id: string): Promise<void> {
    await this.actorRepository.delete(id);
  }
}
