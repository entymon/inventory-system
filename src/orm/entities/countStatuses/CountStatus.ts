import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('count_statuses')
export class CountStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;
}
