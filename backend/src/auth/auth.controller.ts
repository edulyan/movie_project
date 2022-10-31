import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entity/user.entity';
import { Repository } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  @Post('/login')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.signIn(authDto);
    res.cookie('jwtToken', jwt, { httpOnly: true });

    return jwt;
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  async signUp(@Body() userDto: UserDto) {
    return await this.authService.signUp(userDto);
  }

  @Get('user')
  async getUser(@Req() req: Request) {
    let data: object = {};
    const cookie = req.cookies['jwtToken'];

    try {
      data = await this.jwtService.verifyAsync(cookie['token']);
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
    // .catch((error) => {
    //   throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    // });

    if (!data) {
      throw new HttpException('No data in cookies', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.userRepository.findOne(
      { id: data['id'] },
      {
        relations: ['comments', 'favorites'],
      },
    );

    const { password, ...result } = user;

    return result;
  }

  @Post('/forgotPass')
  async forgotPass(@Body() authDto: AuthDto) {
    return await this.authService.forgotPass(authDto);
  }

  @Post('/logout')
  async logOut(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwtToken');

    return {
      message: 'success',
    };
  }
}
