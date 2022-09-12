import { Module } from '@nestjs/common';
import { ActorService } from './actor.service';
import { ActorController } from './actor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieModule } from '../movie/movie.module';
import { Actor } from './entity/actor.entity';
import { ActorToMovie } from '../movie/entity/actorToMovie.entity';

@Module({
  providers: [ActorService],
  controllers: [ActorController],
  imports: [TypeOrmModule.forFeature([Actor, ActorToMovie]), MovieModule],
})
export class ActorModule {}
