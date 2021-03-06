/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  ABANDON = "ABANDON",
  CONFIRM = "CONFIRM",
  DRAFT = "DRAFT",
}

/**
 * Input
 */
export interface CustomerCreateInput {
  name: string;
  phone?: string | null;
  address?: string | null;
  remark?: string | null;
}

export interface CustomerProductSortUpdateInput {
  productSorts: string[];
}

export interface CustomerUpdateInput {
  name?: string | null;
  phone?: string | null;
  address?: string | null;
  remark?: string | null;
  enable?: boolean | null;
}

/**
 * Input
 */
export interface OrderCreateInput {
  customerId: string;
  orderTime: any;
  remark?: string | null;
  orderItem?: OrderItemInput[] | null;
}

export interface OrderItemInput {
  price: number;
  quantity: number;
  productId: string;
}

export interface OrderSearchInput {
  orderTime_gt?: any | null;
  orderTime_lt?: any | null;
}

export interface OrderUpdateInput {
  enable?: boolean | null;
  remark?: string | null;
  status?: OrderStatus | null;
  orderItem?: OrderItemInput[] | null;
}

/**
 * Input
 */
export interface ProductCreateInput {
  name: string;
  unit?: string | null;
  price?: number | null;
  remark?: string | null;
}

export interface ProductUpdateInput {
  name?: string | null;
  unit?: string | null;
  price?: number | null;
  remark?: string | null;
  enable?: boolean | null;
}

export interface ReportWhere {
  month: any;
  customerId: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
