import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../../movie/entity/movie.entity';
import { Person } from '../../person/entity/person.entity';
import { MoviePersonTypeEnum } from '../../common/enums';

@Entity({ name: 'movies_persons' })
export class MoviePerson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  movieId: string;

  @Column()
  personId: string;

  @ManyToOne(() => Movie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  movie: Movie;

  @ManyToOne(() => Person, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  person: Person;

  @Column({
    type: 'enum',
    enum: MoviePersonTypeEnum,
  })
  type: MoviePersonTypeEnum;
}
