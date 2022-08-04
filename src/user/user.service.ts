import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MovieService } from '../movie/movie.service';
import { Repository, UpdateResult } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User, UserRole } from './entity/user.entity';
import { UserDtoUpd } from './dto/userUpd.dto';
import { ChangeRoleDto, UserMovieIdsDto } from './dto/add-change.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly movieService: MovieService,
    private readonly jwtService: JwtService,
  ) {}

  async getAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new HttpException(
        'Failed to get users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepository.findOne(id, {
      relations: ['comments', 'favorites'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(userDto: UserDto): Promise<User> {
    const newUser = await this.userRepository.create(userDto);

    return await this.userRepository.save(newUser);
  }

  async addMovieToFav(dto: UserMovieIdsDto): Promise<User> {
    const user = await this.getById(dto.userId);
    const movie = await this.movieService.getById(dto.movieId);

    user.favorites.push(movie);

    return await this.userRepository.save(user);
  }

  async changeUserRole(changeRole: ChangeRoleDto) {
    const user = await this.getById(changeRole.userId);

    user.role = changeRole.role;

    await this.userRepository.save(user);

    const token = this.jwtService.sign({
      id: user.id,
      role: user.role,
    });

    return { user, token };
  }

  async updateUser(
    id: string,
    userDtoUpd: UserDtoUpd,
  ): Promise<UpdateResult | void> {
    if (!id) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (!userDtoUpd) {
      throw new HttpException('Body is required', HttpStatus.BAD_REQUEST);
    }

    return await this.userRepository.update(id, userDtoUpd);
  }

  async removeMovieFromFav(dto: UserMovieIdsDto): Promise<boolean> {
    const user = await this.getById(dto.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const found = user.favorites.findIndex((x: any) => x.id == dto.movieId);

    if (found == null) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }

    user.favorites.splice(found, 1);

    await this.userRepository.save(user);

    return true;
  }

  async deleteUser(id: string): Promise<boolean> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(user.id);

    return true;
  }
}
