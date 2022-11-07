import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserFavMoviesService } from './user-fav-movies.service';
import { UserMovieIdsDto } from '../common/dto';
import { CreateUserFavMoviesDto } from './dto/createUserFavMov.dto';
import { UpdateUserFavMoviesDto } from './dto/updateUserFavMov.dto';

@Controller('user-fav-movie')
export class UserFavMoviesController {
  constructor(private userFavMoviesService: UserFavMoviesService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.userFavMoviesService.getById(id);
  }

  @Post()
  async create(@Body() createDto: CreateUserFavMoviesDto) {
    return await this.userFavMoviesService.createUserFavMovie(createDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updDto: UpdateUserFavMoviesDto,
  ) {
    return await this.userFavMoviesService.updateMovieFromFav(id, updDto);
  }

  @Delete()
  async delete(@Body() IDs: UserMovieIdsDto) {
    return await this.userFavMoviesService.deleteMovieFromFav(IDs);
  }
}
