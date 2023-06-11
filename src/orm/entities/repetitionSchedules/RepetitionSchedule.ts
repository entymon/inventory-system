import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CountPlan } from '../countPlans/CountPlan';

@Entity('repetition_schedules')
export class RepetitionSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CountPlan, (count_plan: CountPlan) => count_plan.repetition_schedules)
  count_plan: CountPlan;

  @Column()
  next_count: Date;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;
}
