import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from '../../comment/entity/comment.entity';

export enum Genre {
  ACTION = 'action',
  COMEDY = 'comedy',
  DRAMA = 'drama',
  FANTASY = 'fantasy',
  HORROR = 'horror',
  ROMANCE = 'romance',
  THRILLER = 'thriller',
}

@Entity()
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: Genre,
  })
  genre: Genre[];

  @Column()
  image: string;

  @Column()
  video: string;

  @OneToMany(() => Comment, (comment) => comment.movie)
  comments: Comment[];
}
