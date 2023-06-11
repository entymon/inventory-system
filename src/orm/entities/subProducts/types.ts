import { Product } from '../products/Product';

export type TSubProduct = {
  id?: number;
  name: string;
  total: number;
  product?: Product;
  barcode: string;
};
