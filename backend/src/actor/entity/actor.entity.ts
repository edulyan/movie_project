import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../../common/enums';
import { ActorToMovie } from '../../movie/entity/actorToMovie.entity';

@Entity()
export class Actor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  birthday: Date;

  @Column({ type: 'enum', enum: Country })
  country: Country;

  @Column({ nullable: true })
  movieCount: number;

  @OneToMany(() => ActorToMovie, (actorToMovie) => actorToMovie.actor)
  actorToMovies!: ActorToMovie[];
}
