import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(authDto: AuthDto) {
    const useR = await this.userRepository.findOne({
      where: { email: authDto.email },
    });

    if (!useR) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const passCompare = await bcrypt.compare(authDto.password, useR.password);

    if (!passCompare) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.jwtService.sign({ id: useR.id, role: useR.role });

    const { password, ...user } = useR;

    return {
      user,
      token,
    };
  }

  async signUp(userDto: UserDto) {
    const email = await this.userRepository.findOne({
      where: { email: userDto.email },
    });

    if (email) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashPass = await bcrypt.hash(userDto.password, 5);

    const data = await this.userService.createUser({
      ...userDto,
      password: hashPass,
    });

    const token = this.jwtService.sign({ id: data.id, role: data.role });

    const { password, ...user } = data;

    return {
      user,
      token,
    };
  }
}
