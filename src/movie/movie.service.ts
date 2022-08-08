import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileService, FileType } from '../file/file.service';
import { Repository, UpdateResult } from 'typeorm';
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
    const found = await this.movieRepository.find({
      where: { title: title },
    });

    return found;
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

  async updateMovie(id: string, movie: MovieDto): Promise<UpdateResult | void> {
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

    return true;
  }
}
