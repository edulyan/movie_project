import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { getConnection } from 'typeorm';
import {
  changeRoleToUserTest,
  createMovieTest,
  createUserTest,
  filesTest,
} from './test-data';
import { UserRole } from '../src/user/entity/user.entity';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let userId: string;
  let movieId: string;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().close();
    await app.close();
  });

  describe('AUTH', () => {
    describe('/auth/register (POST)', () => {
      it('Successfully user registration', async () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send(createUserTest)
          .expect(201);
      });

      it('Fail user registration ()', async () => {
        return request(app.getHttpServer())
          .post('/auth/register')
          .send(createUserTest)
          .expect(400);
      });
    });

    describe('/auth/login', () => {
      it('Successfully user authorization', async () => {
        return request(app.getHttpServer())
          .post('/auth/login')
          .send(createUserTest)
          .expect(201)
          .then(({ body }: request.Response) => {
            userId = body.user.id;
            jwtToken = body.token;
            expect(jwtToken).toMatch(
              /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/,
            );
            expect(userId).toBeDefined();
          });
      });

      describe('/user/changeUserRole (POST)', () => {
        it('Successfully change user role', async () => {
          return request(app.getHttpServer())
            .post('/user/changeUserRole')
            .send({ userId: userId, role: UserRole.ADMIN })
            .expect(201)
            .then(({ body }: request.Response) => {
              jwtToken = body.token;
            });
        });
      });

      it('Fail user authorization (Invalid email or password)', async () => {
        console.log({ ...createUserTest, email: 'invalid' });

        return request(app.getHttpServer())
          .post('/auth/login')
          .send({ ...createUserTest, email: 'invalid@mail.com' })
          .expect(401);
      });
    });
  });

  describe('MOVIE', () => {
    describe('/movie (POST)', () => {
      it('Successfully creates a movie (POST)', async () => {
        return request(app.getHttpServer())
          .post('/movie')
          .set('Authorization', `Bearer ${jwtToken}`)
          .field('title', createMovieTest.title)
          .field('genre', createMovieTest.genre)
          .attach('image', filesTest.image)
          .attach('video', filesTest.video)
          .expect(201)
          .then(({ body }: request.Response) => {
            movieId = body.id;
          });
      });
    });

    describe('/movie (GET)', () => {
      it('Successfully gets a list of movies', async () => {
        return request(app.getHttpServer())
          .get('/movie?count=10&offset=0')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200)
          .then(({ body }: request.Response) => {
            expect(body).toBeDefined();
          });
      });

      it('Fail to gets a list of movies', async () => {
        return request(app.getHttpServer())
          .get('/movie')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(500);
      });
    });

    describe('/movie/search (GET)', () => {
      it('Successfully searches a movie', async () => {
        return request(app.getHttpServer())
          .get('/movie/search?title=Transformers')
          .expect(200)
          .then(({ body }: request.Response) => {
            expect(body).toBeDefined();
          });
      });
    });

    describe('/movie/:id (GET)', () => {
      it('Successfully gets a movie by ID', async () => {
        return request(app.getHttpServer())
          .get(`/movie/${movieId}`)
          .expect(200)
          .then(({ body }: request.Response) => {
            expect(body).toBeDefined();
          });
      });

      it('Fail to gets a movie by ID (Movie not found)', async () => {
        return request(app.getHttpServer())
          .get('/movie/ad5891ba-05e9-4637-8938-6e95fe693564')
          .expect(404);
      });
    });
  });

  describe('USER', () => {
    describe('/user (GET)', () => {
      it('Successfully gets a list of users', async () => {
        return request(app.getHttpServer())
          .get('/user')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200)
          .then(({ body }: request.Response) => {
            expect(body).toBeDefined();
          });
      });
    });

    describe('/user/:id (GET)', () => {
      it('Successfully gets user by ID', async () => {
        return request(app.getHttpServer())
          .get(`/user/${userId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200)
          .then(({ body }: request.Response) => {
            console.log(userId);

            expect(body).toBeDefined();
          });
      });

      it('Fail to gets user by ID (User not found)', async () => {
        return request(app.getHttpServer())
          .get('/user/d8429001-d38c-4eec-b418-2fe61851f0a9')
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);
      });
    });

    describe('/user/addMovieToFav (POST)', () => {
      it('Successfully adds movie to favorites', async () => {
        return request(app.getHttpServer())
          .post('/user/addMovieToFav')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({ userId: userId, movieId: movieId })
          .expect(201)
          .then(({ body }: request.Response) => {
            console.log(userId, movieId);

            expect(body).toBeDefined();
          });
      });
    });

    describe('/user/removeMovieFromFav (DELETE)', () => {
      it('Successfully removes movie from favorites', async () => {
        return request(app.getHttpServer())
          .delete('/user/removeMovieFromFav')
          .set('Authorization', `Bearer ${jwtToken}`)
          .send({ userId: userId, movieId: movieId })
          .expect(200);
      });
    });
  });

  describe('DELETE', () => {
    describe('/movie/:id (DELETE)', () => {
      it('Successfully movie deletion', async () => {
        return request(app.getHttpServer())
          .delete(`/movie/${movieId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);
      });

      it('Fail movie deletion (Movie not found to deletion)', async () => {
        return request(app.getHttpServer())
          .delete(`/movie/${movieId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);
      });
    });

    describe('/user/:id (DELETE)', () => {
      it('Successfully user deletion', async () => {
        return request(app.getHttpServer())
          .delete(`/user/${userId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(200);
      });

      it('Fail user deletion (User not found to deletion)', async () => {
        return request(app.getHttpServer())
          .delete(`/user/${userId}`)
          .set('Authorization', `Bearer ${jwtToken}`)
          .expect(404);
      });
    });
  });
});
