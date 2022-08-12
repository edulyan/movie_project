import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '../mailer/mailer.service';

export const userTest = {
  firstName: 'Don',
  lastName: 'Bonyan',
  email: 'Don@mail.com',
  password: '20012002',
};

export let signUp: any;

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;
  let mailService: MailService;

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockUserService = {
    createUser: jest.fn(),
  };

  const mockJwtRepository = {
    sign: jest.fn(() => 'signed-token'),
  };

  const mockMailRepository = {
    signUpMail: jest.fn(),
    forgotPassMail: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtRepository,
        },
        {
          provide: MailService,
          useValue: mockMailRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signUp()', () => {
    it('Successfully user sugn up', async () => {
      mockUserService.createUser.mockReturnValue(userTest);
      mockJwtRepository.sign.mockReturnValue('signed-token');

      signUp = await authService.signUp(userTest);

      const { password, ...user } = userTest;

      expect(signUp).toEqual({ user: user, token: 'signed-token' });
    });
  });

  // describe('signIn()', () => {
  //   it('Successfully user log in', async () => {
  //     mockUserRepository.findOne.mockReturnValue(userTest);
  //     mockJwtRepository.sign.mockReturnValue('signed-token');

  //     const signIn = await authService.signIn({
  //       email: 'Don@mail.com',
  //       password: '20012002',
  //     });

  //     expect(signIn).toEqual({ user: signUp.user, token: 'signed-token' });
  //   });
  // });
});
