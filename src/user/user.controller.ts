import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ChangeRoleDto, UserMovieIdsDto } from './dto/add-change.dto';
import { UserDto } from './dto/user.dto';
import { UserDtoUpd } from './dto/userUpd.dto';
import { UserRole } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll() {
    try {
      return await this.userService.getAll();
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userService.getById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/addMovieToFav')
  async addMovieToFav(@Body() dto: UserMovieIdsDto) {
    return await this.userService.addMovieToFav(dto);
  }

  @Post('/changeUserRole')
  async changeUserRole(@Body() changeRole: ChangeRoleDto) {
    try {
      return await this.userService.changeUserRole(changeRole);
    } catch (error) {
      return error;
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UserDtoUpd) {
    try {
      return await this.userService.updateUser(id, user);
    } catch (error) {
      return error;
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/removeMovieFromFav')
  async removeMovieFromFav(@Body() dto: UserMovieIdsDto) {
    try {
      return await this.userService.removeMovieFromFav(dto);
    } catch (error) {
      return error;
    }
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
