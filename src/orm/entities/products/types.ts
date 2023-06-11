import { TSubProduct } from '../subProducts/types';

export type TProduct = {
  id?: number;
  name: string;
  price: number;
  category: string;
  subproducts: TSubProduct[];
};
