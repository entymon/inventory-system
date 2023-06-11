import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../users/User';

@Entity('barcode_scanners')
export class BarcodeScanner {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  user: User;
}
