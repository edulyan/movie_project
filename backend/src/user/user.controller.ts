import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CountFunc } from '../common/decorators/сountFunc.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ChangeRoleDto, SubscribeDto, UserMovieIdsDto } from '../common/dto';
import { UserDtoUpd } from './dto/userUpd.dto';
import { UserRole } from '../common/enums';
import { UserService } from './user.service';
import { LogPropLength } from '../common/decorators/logProp.decorator';
import { EventEmit } from './event-emitter';

@CountFunc
@UseInterceptors(CacheInterceptor)
@Controller('user')
export class UserController {
  private logger = new Logger(UserController.name);

  @LogPropLength
  length: string;

  constructor(
    private readonly userService: UserService,
    private readonly eventEmit: EventEmit,
  ) {}

  @Get('event')
  async event() {
    // this.eventEmit.on('log-event', (args) => {
    //   console.log(args.id, args.text);
    // });
    // return this.eventEmit.log('User logging');

    this.eventEmit.on('getUser', async (args) => {
      console.log(await this.userService.getById(args.id));
    });

    return this.eventEmit.getUserEvent();
  }

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

  @Get('/favorites/:id')
  async getUserFavMovies(@Param('id') id: string) {
    return await this.userService.getUserFavMovies(id);
  }

  @Post('/changeUserRole')
  async changeUserRole(@Body() changeRole: ChangeRoleDto) {
    return await this.userService.changeUserRole(changeRole);
  }

  @Post('/subscribe')
  async subscribe(@Body() subscribeDto: SubscribeDto) {
    return await this.userService.subscribe(subscribeDto);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UserDtoUpd) {
    return await this.userService.updateUser(id, user);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.deleteUser(id);
  }
}
