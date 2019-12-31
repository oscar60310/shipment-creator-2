import { customers_customers } from '../../generated/customers';

export interface ReportGeneratorProps {
  customer: customers_customers | null;
  month: Date | null;
}
