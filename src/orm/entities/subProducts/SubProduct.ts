import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Barcode } from '../Barcodes/Barcode';
import { Product } from '../products/Product';

@Entity('subProducts')
export class SubProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.subproducts)
  product: Product;

  @OneToMany(() => Barcode, (barcode) => barcode.subproduct)
  @JoinColumn()
  barcodes: Barcode[];

  @Column()
  total: number;
}
