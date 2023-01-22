import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Movie } from '../../movie/entity/movie.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { UserRole } from '../../common/enums';
import { UserFavMovies } from '../../user-fav-movies/entity/userFavMovies.entity';
import { Wallet } from '../../wallet/entity/wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isSubscribed: boolean;

  @Column({ default: null })
  next_payment_date: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToOne(() => Wallet, (wallet) => wallet.id, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  wallet: Wallet;

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => UserFavMovies, (userFavMovies) => userFavMovies.user, {
    cascade: true,
  })
  userFavorites: UserFavMovies[];

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdDate: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updatedDate: Date;
}
