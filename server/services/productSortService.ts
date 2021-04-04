import { sequelize } from '../utils/db';
import * as uuid from 'uuid';
import ProductSort from '../utils/dbModels/productSort.model';

export default class ProductSortService {
  public find = async (customerId: string) => {
    return await ProductSort.findAll({
      where: {
        customerId
      }
    });
  };

  public updateOrCreate = async (
    customerId: string,
    productList: Partial<ProductSort>[]
  ) => {
    const t = await sequelize.transaction();
    try {
      await ProductSort.destroy({
        where: {
          customerId
        },
        transaction: t
      });
      await ProductSort.bulkCreate(
        productList.map(product => ({ id: uuid.v4(), ...product })),
        { transaction: t }
      );
      await t.commit();
    } catch (e) {
      await t.rollback();
      throw e;
    }
  };
}
