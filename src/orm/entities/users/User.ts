import bcrypt from 'bcryptjs';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { CountExecution } from '../countExecutions/CountExecution';
import { CountPlan } from '../countPlans/CountPlan';

import { BarcodeScanner } from '../BarcodeScanners/BarcodeScanner';
import { Language, Role } from './types';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    default: 'COUNTER' as Role,
    length: 30,
  })
  role: string;

  @Column({
    default: 'en-US' as Language,
    length: 15,
  })
  language: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  setLanguage(language: Language) {
    this.language = language;
  }

  @OneToOne(() => BarcodeScanner)
  barcode_scanner: BarcodeScanner;

  @OneToMany(() => CountPlan, (countPlan: CountPlan) => countPlan.owner)
  count_plans_owned: CountPlan[];

  @ManyToMany(() => CountPlan)
  @JoinTable()
  count_plans_assigned: CountPlan[];

  @ManyToMany(() => CountExecution)
  @JoinTable()
  count_executions: CountExecution[];

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
