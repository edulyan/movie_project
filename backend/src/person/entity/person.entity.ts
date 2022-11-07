import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Country } from '../../common/enums';
import { MoviePerson } from '../../movie-person/entity/personToMovie.entity';

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

  @OneToMany(() => MoviePerson, (presonToMovie) => presonToMovie.person)
  personToMovies: MoviePerson[];
}
