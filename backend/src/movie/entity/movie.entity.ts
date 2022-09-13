import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from '../../comment/entity/comment.entity';
import { Country, Genre } from '../../common/enums';
import { ActorToMovie } from './actorToMovie.entity';

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
  @Column({ nullable: true })
  voteCount: number;

  @Column()
  image: string;

  @Column()
  video: string;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];

  @OneToMany(() => ActorToMovie, (actorToMovie) => actorToMovie.movie)
  actorToMovies!: ActorToMovie[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
