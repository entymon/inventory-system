import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SubProduct } from '../subProducts/SubProduct';

@Entity('barcodes')
export class Barcode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @ManyToOne(() => SubProduct, (subProduct) => subProduct.barcodes)
  subproduct: SubProduct;
}
