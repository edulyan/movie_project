import { User } from '../../user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Purse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  balance: number;

  @Column({ nullable: false })
  userId: string;

  @ManyToOne(() => User, (user) => user.purses)
  user: User;
}
