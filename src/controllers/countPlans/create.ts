import { NextFunction, Request, Response } from 'express';

import { TProduct } from 'orm/entities/products/types';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const create = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as unknown as TProduct;

  const newCountPlan: TProduct = {
    ...req.body,
    price: parseInt(req.body.price),
  };

  try {
    // const product = Product.create(newProduct);
    // await product.save();

    res.customSuccess(200, `Product was created successfully`, req.body);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};
