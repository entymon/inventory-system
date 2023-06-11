export type TProduct = {
  id?: number;
  price: number;
  category: string;
};

export type TBodyRequestProduct = {
  price: string;
  category: string;
};
