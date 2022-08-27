import { HttpException, HttpStatus, Inject, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieService } from '../movie/movie.service';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UserRole } from './entity/user.entity';
import { RedisCacheService } from '../cache/redisCache.service';

const userMovieIdsTest = {
  userId: '1',
  movieId: '2',
};

const changeRoleTest = {
  userId: '1',
  role: UserRole.ADMIN,
};

export const usersTest = [
  {
    id: '1',
    firstName: 'Oleg',
    lastName: 'Ivanovich',
    email: 'Oleg@mail.ru',
    password: '20012002',
    role: UserRole.USER,
    comments: [],
    favorites: [],
    purses: [],
  },
  {
    id: '2',
    firstName: 'Ivan',
    lastName: 'Ivanovich',
    email: 'Ivan@mail.ru',
    password: '20012002',
    role: UserRole.ADMIN,
    comments: [],
    favorites: [],
    purses: [],
  },
  {
    id: '3',
    firstName: 'Lena',
    lastName: 'Ivanovich',
    email: 'Lena@mail.ru',
    password: '20012002',
    role: UserRole.USER,
    comments: [],
    favorites: [],
    purses: [],
  },
];

export const moviesTest = [
  {
    id: '1',
    title: 'Transformers',
    genre: 'romance',
    image: 'movie_website/image/Oblivion.png',
    video: 'movie_website/video/Обливион.mp4',
    comments: [],
  },
  {
    id: '2',
    title: 'Saving Private Ryan',
    genre: 'drama',
    image: 'movie_website/image/Oblivion.png',
    video: 'movie_website/video/Обливион.mp4',
    comments: [],
  },
  {
    id: '3',
    title: 'La-La-Lend',
    genre: 'romance',
    image: 'movie_website/image/Oblivion.png',
    video: 'movie_website/video/Обливион.mp4',
    comments: [],
  },
];

describe('UserService', () => {
  let userService: UserService;
  let movieService: MovieService;
  let jwtService: JwtService;
  let redisCacheService: RedisCacheService;
  const logger = new Logger(UserService.name);

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockMovieRepository = {
    findOne: jest.fn(),
    getById: jest.fn(),
  };

  const mockJwtRepository = {
    sign: jest.fn(() => 'signed-token'),
  };

  const mockRedisCacheRepository = {
    get: jest.fn(),
    set: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: MovieService,
          useValue: mockMovieRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtRepository,
        },
        {
          provide: RedisCacheService,
          useValue: mockRedisCacheRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    movieService = module.get<MovieService>(MovieService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('getAll()', () => {
    it('Successfully gets all users', async () => {
      mockUserRepository.find.mockResolvedValue(usersTest);

      const getUsers = await userService.getAll();

      expect(getUsers).toEqual(usersTest);
      expect(getUsers).toHaveLength(3);
      expect(mockUserRepository.find).toHaveBeenCalledTimes(1);
    });

    it('Fail to gets all users (INTERNAL_SERVER_ERROR)', async () => {
      mockUserRepository.find.mockRejectedValue(
        new HttpException(
          'Failed to get users',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );

      await expect(userService.getAll()).rejects.toThrow('Failed to get users');
    });
  });

  describe('getById()', () => {
    it('Successfully gets user by ID', async () => {
      mockUserRepository.findOne.mockReturnValue(usersTest[1]);

      expect(await userService.getById('2')).toEqual(usersTest[1]);
    });

    it('Fail to get user by ID (User not found)', async () => {
      mockUserRepository.findOne.mockRejectedValue(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );

      await expect(userService.getById('5')).rejects.toThrow('User not found');
    });
  });

  describe('getByEmail()', () => {
    it('Successfully gets yser by email', async () => {
      mockUserRepository.findOne.mockReturnValue(usersTest[0]);

      expect(await userService.getByEmail('Oleg@mail.ru')).toEqual(
        usersTest[0],
      );
    });

    it('Fail to gets user by email (User not found)', async () => {
      mockUserRepository.findOne.mockRejectedValue(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );

      await expect(userService.getByEmail('Demon@mail.com')).rejects.toThrow(
        'User not found',
      );
    });
  });

  describe('createUser()', () => {
    it('Successfully creates a user', async () => {
      const userTest = {
        firstName: 'Lock',
        lastName: 'Bonyan',
        email: 'Lock@mail.com',
        password: '20012002',
      };
      mockUserRepository.create.mockReturnValue(userTest);
      mockUserRepository.save.mockReturnValue(userTest);

      const savedUser = await userService.createUser(userTest);

      expect(savedUser).toEqual(userTest);
    });
  });

  describe('addMovieToFav()', () => {
    it('Successfully adds movie to favorites', async () => {
      mockUserRepository.findOne.mockReturnValue(usersTest[0]);
      mockMovieRepository.getById.mockReturnValue(moviesTest[1]);
      mockUserRepository.save.mockResolvedValue(usersTest[0]);

      const user = await userService.addMovieToFav(userMovieIdsTest);

      expect(user).toEqual(usersTest[0]);
    });
  });

  describe('changeUserRole()', () => {
    it('Successfully changes role of user', async () => {
      mockUserRepository.findOne.mockReturnValue(usersTest[0]);
      mockUserRepository.save.mockReturnValue(usersTest[0]);
      mockJwtRepository.sign.mockReturnValue('signed-token');

      const changeRole = await userService.changeUserRole(changeRoleTest);

      expect(changeRole).toEqual({ user: usersTest[0], token: 'signed-token' });
    });
  });

  describe('updateUser()', () => {
    it('Successfully updates user', async () => {
      mockUserRepository.update.mockResolvedValue(usersTest[2]);

      const { id, password, comments, favorites, ...user } = usersTest[2];

      const userUpd = await userService.updateUser(usersTest[0].id, user);

      expect(userUpd).toEqual(usersTest[2]);
    });

    it('Fail to update user (User not found)', async () => {
      const { id, password, comments, favorites, ...user } = usersTest[2];

      await expect(userService.updateUser(null, user)).rejects.toThrow(
        'User not found',
      );
    });

    it('Fail to update user (Body is required)', async () => {
      const { id, password, comments, favorites, ...user } = usersTest[2];

      await expect(userService.updateUser('2', null)).rejects.toThrow(
        'Body is required',
      );
    });
  });

  describe('removeMovieFromFav()', () => {
    it('Successfully deletes movie from favorites', async () => {
      mockUserRepository.findOne.mockReturnValue(usersTest[0]);
      mockUserRepository.save.mockResolvedValue(usersTest[0]);

      const user = await userService.removeMovieFromFav(userMovieIdsTest);

      expect(user).toEqual(true);
    });

    it('Fail to deletes movie from favorites (User not found)', async () => {
      mockUserRepository.findOne.mockRejectedValue(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );

      await expect(
        userService.removeMovieFromFav({ userId: '', movieId: '2' }),
      ).rejects.toThrow('User not found');
    });

    it('Fail to deletes movie from favorites (Movie not found)', async () => {
      mockUserRepository.findOne.mockRejectedValue(
        new HttpException('Movie not found', HttpStatus.NOT_FOUND),
      );

      await expect(
        userService.removeMovieFromFav({ userId: '2', movieId: '' }),
      ).rejects.toThrow('Movie not found');
    });
  });

  describe('deleteUser()', () => {
    it('Successfully deletes user', async () => {
      mockUserRepository.findOne.mockReturnValue(usersTest[0]);
      mockUserRepository.delete.mockResolvedValue(usersTest[0]);

      expect(await userService.deleteUser(usersTest[0].id)).toEqual(true);
    });

    it('Fail to deletes user (User not found)', async () => {
      mockUserRepository.findOne.mockRejectedValue(
        new HttpException('User not found', HttpStatus.NOT_FOUND),
      );

      await expect(userService.deleteUser('')).rejects.toThrow(
        'User not found',
      );
    });
  });
});
