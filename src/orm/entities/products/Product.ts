import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SubProduct } from '../subProducts/SubProduct';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  category: string;

  @OneToMany(() => SubProduct, (subProduct: SubProduct) => subProduct.product)
  @JoinColumn()
  subproducts: SubProduct;
}
