/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * Input
 */
export interface CustomerCreateInput {
  name: string;
  phone?: string | null;
  address?: string | null;
  remark?: string | null;
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

//==============================================================
// END Enums and Input Objects
//==============================================================
