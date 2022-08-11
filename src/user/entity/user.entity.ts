import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from '../../movie/entity/movie.entity';
import { Comment } from '../../comment/entity/comment.entity';
import { Purse } from '../../purse/entity/purse.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

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

  @Column({ nullable: true })
  defaultPurseId?: number;

  @OneToOne(() => Purse, (purse) => purse.user)
  @JoinColumn()
  defaultPurse?: Purse;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @OneToMany(() => Comment, (comment) => comment.user, {
    cascade: true,
  })
  comments: Comment[];

  @OneToMany(() => Purse, (purse) => purse.user)
  purses: Purse[];

  @ManyToMany(() => Movie)
  @JoinTable()
  favorites: Movie[];
}
