import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users/User';

@Entity('barcode_scanners')
export class BarcodeScanner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  code: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
