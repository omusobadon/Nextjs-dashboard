import { BaseAPI } from "./BaseAPI";
import { ShopProps, APIResponse } from "./TableInterface"; // 適切なパスを設定してください

export default class PutAPI extends BaseAPI {
  constructor(baseUrl = process.env.NEXT_PUBLIC_GOAPI_IP) {
    super(baseUrl);
  }

  async putShop(data: any): Promise<any> {
    return await this.put("create_shop", data);
  }

  async putProduct(data: any): Promise<any> {
    return await this.put("create_product", data);
  }

  async putSeat(data: any): Promise<any> {
    return await this.put("create_seat", data);
  }

  async putGroup(data: any): Promise<any> {
    return await this.put("create_group", data);
  }

  async putStock(data: any): Promise<any> {
    return await this.put("create_stock", data);
  }

  async putPrice(data: any): Promise<any> {
    return await this.put("create_price", data);
  }
}