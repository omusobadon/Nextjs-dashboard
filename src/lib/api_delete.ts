import { BaseAPI } from "./BaseAPI";

export default class DeleteAPI extends BaseAPI {
  constructor(baseUrl: string = process.env.NEXT_PUBLIC_GOAPI_IP || "") {
    super(baseUrl);
  }

  async deleteShop(id: string) {
    return await this.delete(`delete_shop?id=${id}`);
  }

  async deleteGroup(id: string) {
    return await this.delete(`delete_group?id=${id}`);
  }
  async deleteProduct(id: string) {
    return await this.delete(`delete_product?id=${id}`);
  }

  async deletePrice(id: string) {
    return await this.delete(`delete_price?id=${id}`);
  }

  async deleteSeat(id: string) {
    return await this.delete(`delete_seat?id=${id}`);
  }

  async deleteStock(id: string) {
    return await this.delete(`delete_stock?id=${id}`);
  }

  async deleteCustomer(id: string) {
    return await this.delete(`delete_customer?id=${id}`);
  }

  async deleteOrder(id: string) {
    return await this.delete(`delete_order?id=${id}`);
  }

  async deleteOrderDetail(id: string) {
    return await this.delete(`delete_order_detail?id=${id}`);
  }
}
