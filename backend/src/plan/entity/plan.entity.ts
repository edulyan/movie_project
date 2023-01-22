import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PlanType } from '../../common/enums';

@Entity()
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: PlanType,
  })
  type: PlanType;

  @Column()
  price: number;
}
