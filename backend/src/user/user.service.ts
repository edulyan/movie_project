import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { MovieService } from '../movie/movie.service';
import { RedisCacheService } from '../cache/redisCache.service';
import { Repository, UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserDtoUpd } from './dto/userUpd.dto';
import { ChangeRoleDto, SubscribeDto, UserMovieIdsDto } from '../common/dto';
import { Cache } from 'cache-manager';
import { Movie } from '../movie/entity/movie.entity';
import { WalletService } from '../wallet/wallet.service';
import { PlanService } from '../plan/plan.service';
import { PlanType } from '../common/enums';
import * as moment from 'moment';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly movieService: MovieService,
    private readonly walletService: WalletService,
    private readonly planService: PlanService,
    private readonly jwtService: JwtService,
    private readonly redisCacheService: RedisCacheService,
  ) {}

  async getAll(): Promise<User[]> {
    try {
      const users = await this.userRepository.find({ cache: true });
      // .finally(() => {
      //   this.logger.log(
      //     `${UserService.prototype.getAll.name}() - Successfully found users`,
      //   );
      // });

      // await this.cacheManager.set('cached_users', users, { ttl: 100 });
      // const cachedUsers = await this.cacheManager.get('cached_users');

      // console.log(cachedUsers);

      await this.redisCacheService.set('cached_users', users);

      const cachedUsers = await this.redisCacheService.get('cached_users');

      // console.log(cachedUsers);

      return users;
    } catch (error) {
      this.logger.error(`${UserService.prototype.getAll.name}() - ${error}`);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['comments', 'userFavorites'],
    });

    if (!user) {
      this.logger.error(
        `${UserService.prototype.getById.name}() - User not found`,
      );
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.logger.log(
      `${UserService.prototype.getById.name}() - Successfully found a user by ID - ${user.id}`,
    );
    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      this.logger.error(
        `${UserService.prototype.getByEmail.name}() - User not found`,
      );
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    this.logger.log(
      `${UserService.prototype.getByEmail.name}() - Successfully found a user by ID - ${user.id}`,
    );

    return user;
  }

  async getUserFavMovies(userId: string) {
    const user = await this.getById(userId);

    const moviesIds: string[] = user.userFavorites.map((item) => item.movieId);

    const movies: Movie[] = await Promise.all(
      moviesIds.map((movieId) => {
        return this.movieService.getById(movieId);
      }),
    );

    return movies;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const newUser = await this.userRepository.create(userDto);

    const createWallet = await this.walletService.createWallet();
    newUser.wallet = createWallet;

    return await this.userRepository.save(newUser);
  }

  async changeUserRole(changeRole: ChangeRoleDto) {
    const user = await this.getById(changeRole.userId);

    user.role = changeRole.role;

    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    this.logger.log(
      `${UserService.prototype.changeUserRole.name}() - Successfully was changed role of user`,
    );

    return { user, token };
  }

  //доделать оплату!
  async subscribe(subscribeDto: SubscribeDto) {
    const user = await this.getById(subscribeDto.userId);
    const plan = await this.planService.getPlanById(subscribeDto.planId);

    // console.log('USER - ', user);
    // console.log('PLAN - ', plan);

    const date = this.planService.getNextDate(plan.type);

    // console.log(date);

    user.isSubscribed = true;
    user.next_payment_date = date;

    this.userRepository.save(user);

    return user.next_payment_date;
  }

  @Cron(CronExpression.EVERY_SECOND, {
    timeZone: 'Europe/Moscow',
  })
  async subsDateCheck() {
    let dateNow = moment(Date.now()).format('DD-MM-YYYY:HH-mm-ss');
    const users = await this.getAll();

    for (let i = 0; i < users.length; i++) {
      if (dateNow === users[i].next_payment_date) {
        users[i].isSubscribed = false;
        await this.userRepository.save(users[i]);
      }
    }
  }

  async updateUser(
    id: string,
    userDtoUpd: UserDtoUpd,
  ): Promise<UpdateResult | void> {
    if (!id) {
      this.logger.error(
        `${UserService.prototype.updateUser.name}() - User not found`,
      );
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!userDtoUpd) {
      this.logger.error(
        `${UserService.prototype.updateUser.name}() - Body is required`,
      );
      throw new HttpException('Body is required', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.update(id, userDtoUpd).finally(() => {
      this.logger.log(
        `${UserService.prototype.updateUser.name}() - Successfully was updated a user`,
      );
    });
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      this.logger.error(
        `${UserService.prototype.deleteUser.name}() - User not found`,
      );
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(user.id).finally(() => {
      this.logger.log(
        `${UserService.prototype.deleteUser.name}() - Successfully was deleted a user`,
      );
    });

    return true;
  }
}
