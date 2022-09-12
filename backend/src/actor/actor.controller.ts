import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/createActor.dto';
import { ActorMovieIdsDto } from '../common/dto';

@Controller('actor')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get(':id')
  async getActorById(@Param('id') id: string) {
    return await this.actorService.getActorById(id);
  }

  @Post()
  async create(@Body() actorDto: CreateActorDto) {
    return await this.actorService.createActor(actorDto);
  }

  @Post('addActorToMovie')
  async addActorToMovie(@Body() idsDto: ActorMovieIdsDto) {
    return await this.actorService.addActorToMovie(idsDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.actorService.deleteActor(id);
  }
}
