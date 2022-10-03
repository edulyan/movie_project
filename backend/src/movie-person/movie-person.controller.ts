import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMoviePersonDto } from './dto/createMoviePerson.dto';
import { UpdateMoviePersonDto } from './dto/updateMoviePerson.dto';
import { MoviePersonService } from './movie-person.service';

@Controller('movie-person')
export class MoviePersonController {
  constructor(private moviePersonService: MoviePersonService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.moviePersonService.getById(id);
  }

  @Post()
  async create(@Body() createDto: CreateMoviePersonDto) {
    return await this.moviePersonService.createMoviePerson(createDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updDto: UpdateMoviePersonDto) {
    return await this.moviePersonService.updateMoviePerson(id, updDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.moviePersonService.deleteMoviePerson(id);
  }
}
