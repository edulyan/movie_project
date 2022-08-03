import { HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MovieService } from '../movie/movie.service';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

const usersTest = [
  {
    id: '1',
    firstName: 'Oleg',
    lastName: 'Ivanovich',
    email: 'Oleg@mail.ru',
    password: '20012002',
  },
  {
    id: '2',
    firstName: 'Ivan',
    lastName: 'Ivanovich',
    email: 'Ivan@mail.ru',
    password: '20012002',
  },
  {
    id: '3',
    firstName: 'Lena',
    lastName: 'Ivanovich',
    email: 'Lena@mail.ru',
    password: '20012002',
  },
];

describe('UserService', () => {
  let userService: UserService;
  let movieService: MovieService;
  let jwtService: JwtService;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
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
          useValue: jest.fn(),
        },
        {
          provide: JwtService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    movieService = module.get<MovieService>(MovieService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('getAll()', () => {
    it('Successfully gets all users', async () => {
      mockUserRepository.find.mockReturnValue(usersTest);

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
    it('Successfully adds movie to favorites', async () => {});
  });
});
