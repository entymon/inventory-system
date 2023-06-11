import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Product } from '../products/Product';

@Entity('subProducts')
export class SubProduct extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column()
  barcode: string;

  @Column()
  total: number;

  @ManyToOne(() => Product, (product) => product.subproducts)
  product: Product;
}
