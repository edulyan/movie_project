import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/createPerson.dto';
import { PersonMovieIdsDto } from '../common/dto';
import { UpdatePersonDto } from './dto/updatePerson.dto';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Get(':id')
  async getPersonById(@Param('id') id: string) {
    return await this.personService.getById(id);
  }

  @Post()
  async create(@Body() actorDto: CreatePersonDto) {
    return await this.personService.createPerson(actorDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updDto: UpdatePersonDto) {
    return await this.personService.updatePerson(id, updDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.personService.deletePerson(id);
  }
}
