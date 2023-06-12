import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CountExecution } from '../countExecutions/CountExecution';
import { RepetitionSchedule } from '../repetitionSchedules/RepetitionSchedule';
import { User } from '../users/User';

@Entity('count_plans')
export class CountPlan extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.count_plans_owned)
  owner: User;

  @ManyToMany(() => User)
  @JoinTable()
  assignees: User[];

  @OneToMany(() => RepetitionSchedule, (repetitionSchedule: RepetitionSchedule) => repetitionSchedule.count_plan)
  @JoinColumn()
  repetition_schedules: RepetitionSchedule[];

  @OneToMany(() => CountExecution, (countExecution: CountExecution) => countExecution.count_plan)
  @JoinColumn()
  count_executions: CountExecution;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
