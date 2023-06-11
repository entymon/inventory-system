import { NextFunction, Request, Response } from 'express';

import { Product } from 'orm/entities/products/Product';
import { TBodyRequestProduct, TProduct } from 'orm/entities/products/types';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as unknown as TBodyRequestProduct;

  const newProduct: TProduct = {
    ...req.body,
    price: parseInt(req.body.price),
  };

  try {
    const product = Product.create(newProduct);
    await product.save();

    res.customSuccess(200, `Product was created successfully`, req.body);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
