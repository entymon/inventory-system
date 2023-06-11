import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CountPlan } from '../countPlans/CountPlan';
import { CountStatus } from '../countStatuses/CountStatus';
import { User } from '../users/User';

@Entity('count_executions')
export class CountExecution {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CountPlan, (countPlan) => countPlan.count_executions)
  count_plan: CountPlan;

  @OneToOne(() => CountStatus)
  @JoinColumn()
  status: CountStatus;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
