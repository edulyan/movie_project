import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieService } from '../movie/movie.service';
import { UserService } from '../user/user.service';
import { CommentService } from './comment.service';
import { Comment } from './entity/comment.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { moviesTest, usersTest } from '../user/user.service.spec';

const commentsTest = [
  {
    id: '1',
    username: 'Oleg Ivanovic',
    text: 'Movie is good',
    movie: moviesTest[1],
    user: usersTest[0],
  },
  {
    id: '2',
    username: 'Lena Ivanovich',
    text: 'Movie is good',
    movie: moviesTest[1],
    user: usersTest[2],
  },
];

describe('CommentService', () => {
  let commentService: CommentService;
  let userService: UserService;
  let movieService: MovieService;

  const mockCommentRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserService = {
    getById: jest.fn(),
  };

  const mockMovieService = {
    getById: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: MovieService,
          useValue: mockMovieService,
        },
      ],
    }).compile();

    commentService = module.get<CommentService>(CommentService);
    userService = module.get<UserService>(UserService);
    movieService = module.get<MovieService>(MovieService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('getAll()', () => {
    it('Successfully gets all comments', async () => {
      mockCommentRepository.find.mockReturnValue(commentsTest);

      expect(await commentService.getAll()).toEqual(commentsTest);
    });

    it('Fail to gets comments (Failed to get comments)', async () => {
      mockCommentRepository.find.mockRejectedValue(
        new HttpException(
          'Failed to get comments',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );

      await expect(commentService.getAll()).rejects.toThrow(
        'Failed to get comments',
      );
    });
  });

  describe('getById()', () => {
    it('Successfully gets comments user by ID', async () => {
      mockCommentRepository.findOne.mockReturnValue(commentsTest[1]);

      expect(await commentService.getById('2')).toEqual(commentsTest[1]);
    });

    it('Fail to get comment by ID (Comment not found)', async () => {
      mockCommentRepository.findOne.mockRejectedValue(
        new HttpException('Comment not found', HttpStatus.NOT_FOUND),
      );

      await expect(commentService.getById('1')).rejects.toThrow(
        'Comment not found',
      );
    });
  });

  describe('createComment()', () => {
    it('Successfully creates movie', async () => {
      const commentTest = {
        text: 'Film can only watched only one time',
        userId: usersTest[1].id,
        movieId: moviesTest[1].id,
      };
      mockUserService.getById.mockReturnValue(usersTest[1]);
      mockMovieService.getById.mockReturnValue(moviesTest[1]);
      mockCommentRepository.create.mockReturnValue(commentTest);
      mockCommentRepository.save.mockReturnValue(commentTest);

      const newComment = await commentService.createComment(commentTest);

      expect(newComment).toEqual(commentTest);
    });
  });

  describe('deleteComment()', () => {
    it('Successfully deletes movie', async () => {
      mockCommentRepository.findOne.mockReturnValue(commentsTest[0]);

      expect(await commentService.deleteComment(commentsTest[0].id)).toEqual(
        true,
      );
    });

    it('Fail to delete a movie', async () => {
      mockCommentRepository.findOne.mockRejectedValue(
        new HttpException('Comment not found', HttpStatus.NOT_FOUND),
      );

      await expect(commentService.deleteComment(null)).rejects.toThrow(
        'Comment not found',
      );
    });
  });
});

// const commentTest = {
//   username: 'Oleg Ivanovich',
//   text: 'Film can only watched only one time',
//   movie: {
//     id: '3',
//     title: 'The Batman',
//     genre: [Genre.ACTION],
//     image: 'movie_website/image/Oblivion.png',
//     video: 'movie_website/video/Обливион.mp4',
//     comments: [],
//   },
//   user: {
//     id: '1',
//     firstName: 'Oleg',
//     lastName: 'Ivanovich',
//     email: 'Oleg@mail.ru',
//     password: '20012002',
//     role: UserRole.USER,
//     comments: [],
//     favorites: [],
//   },
// };
