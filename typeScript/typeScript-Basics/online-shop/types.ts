export interface IProduct {
  readonly id: number;
  name: string;
  price: number;
  stock: number;
  category: ICategory;
}

export interface ICategory {
  name: string;
  description?: string;
}

export interface ICustomer {
  readonly id: number;
  name: string;
  email: string;
}

export type OrderStatus = "pending" | "confirmed" | "shipped";

export interface ILineItem {
  product: IProduct;
  quantity: Number;
}

export interface IOrder {
  customer: ICustomer;
  items: ILineItem[];
  status: OrderStatus;
}
