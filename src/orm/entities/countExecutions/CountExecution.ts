import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CountPlan } from '../countPlans/CountPlan';
import { User } from '../users/User';

import { CountExecutionStatusEnum } from './types';

@Entity('count_executions')
export class CountExecution extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CountPlan, (countPlan) => countPlan.count_executions)
  count_plan: CountPlan;

  // It should be dictionary for normalization. Was removed to simplify the code
  @Column()
  status: CountExecutionStatusEnum;

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
