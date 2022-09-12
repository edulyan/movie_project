import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from './movie.entity';
import { Actor } from '../../actor/entity/actor.entity';

@Entity()
export class ActorToMovie {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  movieId: string;

  @Column()
  actorId: string;

  @ManyToOne(() => Movie, (movie) => movie.actorToMovies)
  movie!: Movie;

  @ManyToOne(() => Actor, (actor) => actor.actorToMovies)
  actor!: Actor;
}
