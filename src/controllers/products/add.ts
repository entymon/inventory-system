import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Product } from 'orm/entities/products/Product';
import { TProduct } from 'orm/entities/products/types';
import { SubProduct } from 'orm/entities/subProducts/SubProduct';
import { TSubProduct } from 'orm/entities/subProducts/types';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const add = async (req: Request, res: Response, next: NextFunction) => {
  const { name, price, category, subproducts } = req.body as unknown as TProduct;

  const productRepository = getRepository(Product);

  try {
    let product = await productRepository.findOne({ where: { name } });

    if (product) {
      const customError = new CustomError(400, 'General', 'Product already exists', [
        `Name '${product.name}' already exists`,
      ]);
      return next(customError);
    }

    const newProduct = Product.create({
      name,
      price,
      category,
    });

    product = await newProduct.save();

    addSubProducts(product, subproducts);

    res.customSuccess(200, `Product id: ${product.id} was created successfully`);
  } catch (err) {
    const customError = new CustomError(400, 'Raw', 'Error', null, err);
    return next(customError);
  }
};

const addSubProducts = (product: Product, subProducts: TSubProduct[]): void => {
  if (subProducts.length === 0) return;

  subProducts.forEach((subProduct) => {
    SubProduct.create({
      name: subProduct.name,
      barcode: subProduct.barcode,
      total: subProduct.total,
      product,
    }).save();
  });
};
