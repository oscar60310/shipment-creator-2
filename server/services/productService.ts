import * as uuid from 'uuid';
import Product from '../utils/dbModels/product.model';

export default class ProductService {
  public createOne = async (data: Partial<Product>) => {
    return await Product.create({ ...data, enable: true, id: uuid.v4() });
  };

  public updateOne = async (id: string, data: Partial<Product>) => {
    const [updateCount, products] = await Product.update(data, {
      returning: true,
      where: { id }
    });
    if (updateCount === 0) throw new Error('Update product failed');
    return products[0];
  };

  public findOne = async (id: string) => {
    return await Product.findOne({ where: { id } });
  };

  public findAll = async () => {
    return await Product.findAll({ where: { enable: true } });
  };
}
