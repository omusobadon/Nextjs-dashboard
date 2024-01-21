import { BaseAPI } from "./BaseAPI";

export default class DeleteAPI extends BaseAPI {
  constructor(baseUrl = process.env.NEXT_PUBLIC_GOAPI_IP) {
    super(baseUrl);
  }

  async deleteShop(id) {
    return await this.delete(`delete_shop?id=${id}`);
  }

  async deleteGroup(id) {
    return await this.delete(`delete_group?id=${id}`);
  }

  async deleteProduct(id) {
    return await this.delete(`delete_product?id=${id}`);
  }

  async deletePrice(id) {
    return await this.delete(`delete_price?id=${id}`);
  }

  async deleteSeat(id) {
    return await this.delete(`delete_seat?id=${id}`);
  }

  async deleteStock(id) {
    return await this.delete(`delete_stock?id=${id}`);
  }

  async deleteCustomer(id) {
    return await this.delete(`delete_customer?id=${id}`);
  }

  async deleteOrder(id) {
    return await this.delete(`delete_order?id=${id}`);
  }

  async deleteOrderDetail(id) {
    return await this.delete(`delete_order_detail?id=${id}`);
  }
}
