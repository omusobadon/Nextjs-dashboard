export interface ShopProps {
  id: number;
  name: string;
  phone: string;
  address: string;
}

export interface ProductProps {
  id: number;
  group_id: number;
  name: string;
  max_people: number;
  qty: number;
  remark: string;
  img_data?: string;
  price: PriceProps[]; // この行を追加
}

export interface PriceProps {
  id: number;
  product_id: number;
  name: string;
  value: number;
  tax: number;
  remark: string;
  stock: StockProps[]; // この行を追加
}

export interface SeatProps {
  id: number;
  product_id: number;
  row: number;
  column: number;
  is_enable: boolean;
  remark: string;
}

export interface StockProps {
  id: number;
  price_id: number;
  name: string;
  qty: number;
  start_at: string;
  end_at: string;
  is_enable: boolean;
  product_id: number; // ここに追加
}

export interface SeatReserveProps {
  id: number;
  stock_id: number;
  seat_id: number;
  is_reserved: boolean;
}

export interface OrderDetailProps {
  id: number;
  order_id: number;
  stock_id: number;
  seat_id: number;
  number_people: number;
  qty: number;
}

export interface ReservationEndProps {
  id: number;
  order_id: number;
  is_accepted: boolean;
  created_at: string;
}

export interface ReservationCancelProps {
  id: number;
  oder_id: number;
  is_accepted: boolean;
  created_at: string;
}

export interface PaymentProps {
  id: number;
  order_id: number;
  is_accepted: boolean;
  message: string;
  created_at: string;
}

export interface OrderProps {
  id: number;
  customer_id: number;
  start_at: string;
  end_at: string;
  is_accepted: boolean;
  is_pending: boolean;
  created_at: string;
  remark: string;
  stock_id: number; // ここに追加
}

export interface CustomerProps {
  id: number;
  name: string;
  mail: string;
  phone: string;
  password: string;
  address: string;
  payment_info: string;
  order: OrderProps[]; // order プロパティを追加
}

export interface ManageApiResponse {
  message: string;
  groups: GroupProps[];
  customers: CustomerProps[];
}

export interface GroupProps {
  id: number;
  shop_id: number;
  name: string;
  start_before: number;
  invalid_duration: number;
  unit_time: number;
  max_time: number;
  interval: number;
  product: ProductProps[]; // ネストされたProductProps
}

export interface APIResponse {
  shop: ShopProps[];
  product_group: GroupProps[];
  product: ProductProps[];
  price: PriceProps[];
  seat: SeatProps[];
  stock: StockProps[];
  seat_reserve: SeatReserveProps[];
  order_detail: OrderDetailProps[];
  reservation_end: ReservationEndProps[];
  reservation_cancel: ReservationCancelProps[];
  payment: PaymentProps[];
  order: OrderProps[];
  customer: CustomerProps[];
  get_manage: ManageApiResponse;
}
