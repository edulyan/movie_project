import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../../movie/entity/movie.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  text: string;

  @ManyToOne(() => Movie, (movie) => movie.comments, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
  user: User;
}
