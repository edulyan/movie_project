import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileType } from '../common/enums';
import { Repository, UpdateResult, Connection } from 'typeorm';
import { CreateMovieDto } from './dto/createMovie.dto';
import { Movie } from './entity/movie.entity';
import { UpdateMovieDto } from './dto/updateMovie.dto';
import { FileService } from '../file/file.service';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie) private movieRepository: Repository<Movie>,
    private readonly fileService: FileService,
  ) {}

  async getAll(count: number, offset: number): Promise<Movie[]> {
    try {
      return await this.movieRepository.find({
        take: count,
        skip: offset,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to get movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id, {
      relations: ['comments', 'actorToMovies'],
    });

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async search(title: string): Promise<Movie[]> {
    const found = await this.movieRepository.find({
      where: { title: title },
    });

    return found;
  }

  async createMovie(
    movieDto: CreateMovieDto,
    image: string,
    video: string,
    trailer: string,
  ): Promise<Movie> {
    try {
      const imagePath = await this.fileService.createFile(
        FileType.IMAGE,
        image,
      );
      const videoPath = await this.fileService.createFile(
        FileType.VIDEO,
        video,
      );
      const trailerPath = await this.fileService.createFile(
        FileType.TRAILER,
        trailer,
      );
      const movie = await this.movieRepository.create({
        ...movieDto,
        image: imagePath,
        video: videoPath,
        trailer: trailerPath,
      });

      return await this.movieRepository.save(movie);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateMovie(
    id: string,
    movie: UpdateMovieDto,
  ): Promise<UpdateResult | void> {
    const movieOne = await this.getById(id);

    if (!movieOne) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return await this.movieRepository.update(id, movie);
  }

  async deleteMovie(id: string): Promise<boolean> {
    const movie = await this.movieRepository.findOne(id);

    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    await this.movieRepository.delete(movie.id);
    this.fileService.deleteFile(movie.image);
    this.fileService.deleteFile(movie.video);
    this.fileService.deleteFile(movie.trailer);

    return true;
  }
}
