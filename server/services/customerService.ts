import * as uuid from 'uuid';
import Customer from '../utils/dbModels/customer.model';

export default class CustomerService {
  public createOne = async (data: Partial<Customer>) => {
    const result = await Customer.create({
      ...data,
      id: uuid.v4(),
      enable: true
    });
    return result.id;
  };

  public findOne = async (id: string) => {
    const customer = await Customer.findOne({ where: { id } });
    return customer;
  };

  public updateOne = async (id: string, data: Partial<Customer>) => {
    const [number, customer] = await Customer.update(data, {
      where: { id },
      returning: true
    });
    if (number === 0) throw new Error('Update failed');
    return customer[0];
  };
}
