import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { Country, Genre } from '../../common/enums';
import { PersonToMovie } from '../../movie-person/entity/personToMovie.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column()
  year: number;

  @Column()
  ageRating: string;

  @Column()
  runTime: string;

  @Column()
  budget: number;

  @Column({ default: false })
  withSubscription: boolean;

  // @Column('varchar', { array: true })
  // actors: string[];

  @Column({
    type: 'enum',
    enum: Country,
    array: true,
  })
  country: Country[];

  @Column({
    type: 'enum',
    enum: Genre,
    array: true,
  })
  genre: Genre[];

  //Рейтинг фильма
  @Column({ type: 'float', nullable: true, default: 0 })
  averageRating: number;

  //Количество голосов за фильм
  @Column({ default: 0 })
  voteCount: number;

  @Column()
  image: string;

  @Column()
  video: string;

  @Column()
  trailer: string;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @OneToMany(() => PersonToMovie, (personToMovie) => personToMovie.movie)
  personToMovies: PersonToMovie[];

  @ManyToOne(() => User, (user) => user.favorites)
  userFavorites: User;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
