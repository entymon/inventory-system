import { BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { SubProduct } from '../subProducts/SubProduct';

@Entity('products')
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  name: string;

  @Column('numeric', {
    nullable: false,
  })
  price: number;

  @Column({
    nullable: false,
  })
  category: string;

  @OneToMany(() => SubProduct, (subProduct: SubProduct) => subProduct.product)
  @JoinColumn()
  subproducts: SubProduct;
}
