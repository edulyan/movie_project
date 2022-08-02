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
} from '@nestjs/common';
import { UserRole } from '../user/entity/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';
import { Roles } from '../decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return await this.movieService.getAll(count, offset);
  }

  @Get('/search')
  async search(@Query('title') title: string) {
    return await this.movieService.search(title);
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.movieService.getById(id);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  async createMovie(@UploadedFiles() files, @Body() movieDto: MovieDto) {
    const { image, video } = files;

    return await this.movieService.createMovie(movieDto, image[0], video[0]);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateMovie(@Param('id') id: string, @Body() movie: MovieDto) {
    return await this.movieService.updateMovie(id, movie);
  }

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    return await this.movieService.deleteMovie(id);
  }
}
