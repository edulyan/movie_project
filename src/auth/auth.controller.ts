import {
  Body,
  Controller,
  Post,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
