import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserRole } from '../common/enums';
import { RolesGuard } from '../common/guards/roles.guard';
import { CreateMovieDto } from './dto/createMovie.dto';
import { MovieService } from './movie.service';
import { Roles } from '../common/decorators/roles.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { SomeInterceptor } from '../common/interceptors/some.interceptor';
import { ChangeInterceptor } from '../common/interceptors/change.interceptor';
import { UpdateMovieDto } from './dto/updateMovie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  // @UseInterceptors(SomeInterceptor)
  @Get()
  async getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return await this.movieService.getAll(count, offset);
  }

  @Get('/search')
  async search(@Query('title') title: string) {
    return await this.movieService.search(title);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.movieService.getById(id);
  }

  @Get('movieActors/:id')
  async getMovieActors(@Param('id') id: string) {
    return await this.movieService.getMovieActors(id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  // @UsePipes(new ValidationPipe({ transform: true }))
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
      { name: 'trailer', maxCount: 1 },
    ]),
    ChangeInterceptor,
  )
  async createMovie(@UploadedFiles() files, @Body() movieDto: CreateMovieDto) {
    const { image, video, trailer } = files;

    return await this.movieService.createMovie(
      movieDto,
      image[0],
      video[0],
      trailer[0],
    );
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateMovie(@Param('id') id: string, @Body() movie: UpdateMovieDto) {
    return await this.movieService.updateMovie(id, movie);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return await this.movieService.deleteMovie(id);
  }
}
