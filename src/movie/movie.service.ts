import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService, FileType } from '../file/file.service';
import { Repository } from 'typeorm';
import { MovieDto } from './dto/movie.dto';
import { Movie } from './entity/movie.entity';

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
      console.log(error);
      throw new HttpException(
        'Failed to get movies',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id, {
      relations: ['comments'],
    });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    return movie;
  }

  async search(title: string): Promise<Movie[]> {
    try {
      const found = await this.movieRepository.find({
        where: { title: title },
      });

      return found;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to search movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createMovie(
    movieDto: MovieDto,
    image: string,
    video: string,
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
      const movie = await this.movieRepository.create({
        ...movieDto,
        image: imagePath,
        video: videoPath,
      });

      return await this.movieRepository.save(movie);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to create movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateMovie(id: string, movie: MovieDto): Promise<MovieDto> {
    try {
      await this.movieRepository
        .update(id, movie)
        .catch((movie: MovieDto) => {
          if (!movie) {
            throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
          }
        })
        .catch((err: string) => {
          if (err) {
            throw new HttpException(
              'Failed to update movie',
              HttpStatus.INTERNAL_SERVER_ERROR,
            );
          }
        });

      return movie;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Failed to update movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMovie(id: string): Promise<void> {
    const movie = await this.movieRepository.findOne(id);

    if (!movie) {
      throw new HttpException(
        'Movie not found to deletion',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.movieRepository.delete(movie.id);
  }
}
