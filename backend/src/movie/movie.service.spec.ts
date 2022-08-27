import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileService } from '../file/file.service';
import { Genre, Movie } from './entity/movie.entity';
import { MovieService } from './movie.service';

const moviesTest = [
  {
    id: '1',
    title: 'Transformers',
    genre: [Genre.ACTION],
    image: 'movie_website/image/Oblivion.png',
    video: 'movie_website/video/Обливион.mp4',
    comments: [],
  },
  {
    id: '2',
    title: 'Saving Private Ryan',
    genre: [Genre.DRAMA],
    image: 'movie_website/image/Oblivion.png',
    video: 'movie_website/video/Обливион.mp4',
    comments: [],
  },
  {
    id: '3',
    title: 'La-La-Lend',
    genre: [Genre.ROMANCE],
    image: 'movie_website/image/Oblivion.png',
    video: 'movie_website/video/Обливион.mp4',
    comments: [],
  },
];

describe('MovieService', () => {
  let movieService: MovieService;
  let fileService: FileService;

  const mockMovieRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockFileRepository = {
    createFile: jest.fn(),
    deleteFile: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieService,
        {
          provide: getRepositoryToken(Movie),
          useValue: mockMovieRepository,
        },
        {
          provide: FileService,
          useValue: mockFileRepository,
        },
      ],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    fileService = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
    expect(fileService).toBeDefined();
  });

  describe('getAll()', () => {
    it('Successfully gets all movies', async () => {
      mockMovieRepository.find.mockReturnValue(moviesTest);

      expect(await movieService.getAll(10, 0)).toEqual(moviesTest);
    });

    it('Fail to gets users (Failed to get movies)', async () => {
      mockMovieRepository.find.mockRejectedValue(
        new HttpException(
          'Failed to get movies',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );

      await expect(movieService.getAll(0, 2)).rejects.toThrow(
        'Failed to get movies',
      );
    });
  });

  describe('getById()', () => {
    it('Successfully gets movies by ID', async () => {
      mockMovieRepository.findOne.mockReturnValue(moviesTest[2]);

      expect(await movieService.getById('3')).toEqual(moviesTest[2]);
    });

    it('Fail to get movie by ID (Movie not found)', async () => {
      mockMovieRepository.findOne.mockRejectedValue(
        new HttpException('Movie not found', HttpStatus.NOT_FOUND),
      );

      await expect(movieService.getById('1')).rejects.toThrow(
        'Movie not found',
      );
    });
  });

  describe('search()', () => {
    it('Successfully gets movies by search', async () => {
      mockMovieRepository.find.mockReturnValue(moviesTest[2]);

      const movies = await movieService.search('La-La-Lend');

      expect(movies).toEqual(moviesTest[2]);
    });
  });

  describe('createMovie()', () => {
    it('Successfully creates movie', async () => {
      const movieTest = {
        title: 'The Green Mile',
        genre: Genre.DRAMA,
        image: 'movie_website/image/Oblivion.png',
        video: 'movie_website/video/Обливион.mp4',
      };
      mockMovieRepository.create.mockReturnValue(movieTest);
      mockMovieRepository.save.mockReturnValue(movieTest);

      const createMovie = await movieService.createMovie(
        {
          title: 'The Green Mile',
          genre: [Genre.DRAMA],
        },
        'movie_website/image/Oblivion.png',
        'movie_website/video/Обливион.mp4',
      );

      expect(createMovie).toEqual(movieTest);
    });

    it('Fail to create a movie', async () => {
      mockMovieRepository.create.mockRejectedValue(
        new HttpException(
          'Failed to create movie',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );

      await expect(
        movieService.createMovie(
          {
            title: 'The Green Mile',
            genre: [Genre.DRAMA],
          },
          'movie_website/image/Oblivion.png',
          'movie_website/video/Обливион.mp4',
        ),
      ).rejects.toThrow('Failed to create movie');
    });
  });

  describe('updateMovie()', () => {
    it('Successfully updates movie', async () => {
      mockMovieRepository.update.mockReturnValue(moviesTest[2]);

      const { id, image, video, comments, ...movie } = moviesTest[2];

      const movieUpd = await movieService.updateMovie(moviesTest[0].id, movie);

      expect(movieUpd).toEqual(moviesTest[2]);
    });
  });

  describe('deleteMovie()', () => {
    it('Successfully deletes movie', async () => {
      mockMovieRepository.findOne.mockReturnValue(moviesTest[0]);

      expect(await movieService.deleteMovie(moviesTest[0].id)).toEqual(true);
    });

    it('Fail to delete a movie', async () => {
      mockMovieRepository.findOne.mockRejectedValue(
        new HttpException('Movie not found', HttpStatus.NOT_FOUND),
      );

      await expect(movieService.deleteMovie('')).rejects.toThrow(
        'Movie not found',
      );
    });
  });
});
