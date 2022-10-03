import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../../common/enums';
import { PersonToMovie } from '../../movie-person/entity/personToMovie.entity';

@Entity()
export class Person {
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

  @OneToMany(() => PersonToMovie, (presonToMovie) => presonToMovie.person)
  personToMovies: PersonToMovie[];
}
