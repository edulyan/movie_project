import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Movie } from '../../movie/entity/movie.entity';
import { User } from '../../user/entity/user.entity';

@Entity({ name: 'user_fav_movies' })
export class UserFavMovies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  movieId: string;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Movie, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  movie: Movie;

  @Column({ default: false })
  isSelected: boolean;
}
