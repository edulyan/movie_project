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
import { CountFunc } from '../decorators/сountFunc.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { ChangeRoleDto, UserMovieIdsDto } from './dto/add-change.dto';
import { UserDtoUpd } from './dto/userUpd.dto';
import { UserRole } from './entity/user.entity';
import { UserService } from './user.service';
import { LogPropLength } from '../decorators/logProp.decorator';

@CountFunc
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @LogPropLength
  length: string;

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAll() {
    return await this.userService.getAll();
  }

  @LogPropLength
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
    return await this.userService.changeUserRole(changeRole);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UserDtoUpd) {
    return await this.userService.updateUser(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/removeMovieFromFav')
  async removeMovieFromFav(@Body() dto: UserMovieIdsDto) {
    return await this.userService.removeMovieFromFav(dto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
