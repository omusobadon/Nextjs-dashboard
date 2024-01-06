export interface ProductInt {
  id: number;
  category: string;
  name: string;
  value: number;
  num: number;
}
export interface stockInt {
  id: number;
  product_id: number;
  start: Date;
  end: Date;
  interval: string;
  num: number;
  state: boolean;
}

export interface orderInt {}

export interface feeInt {}

export interface paymentInt {}

export interface customerInt {}

export interface ApiResponse {
  order: orderInt[];
  stock: stockInt[];
  product: ProductInt[];
  fee: feeInt[];
  payment: paymentInt[];
  customer: customerInt[];
}
