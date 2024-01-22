import { BaseAPI } from "./BaseAPI";
import { ShopProps, APIResponse } from "./TableInterface"; // 適切なパスを設定してください

class GetAPI extends BaseAPI {
  constructor(baseUrl: string = process.env.NEXT_PUBLIC_GOAPI_IP || "") {
    super(baseUrl);
  }

  async getShops(): Promise<ShopProps[]> {
    const response = (await this.get("get_shop")) as APIResponse;
    return response.shop;
  }

  async getManageData(shopId: any): Promise<any> {
    let params = {};
    if (shopId) {
      params = { shop_id: shopId };
    }
    return await this.get("get_manage", params);
  }

  async getGroup(shopId: any): Promise<any> {
    let params = {};
    if (shopId) {
      params = { shop_id: shopId };
    }
    return await this.get("get_group", params);
  }

  async getStock(priceId: any): Promise<any> {
    let params = {};
    if (priceId) {
      params = { price_id: priceId };
    }
    return await this.get("get_stock", params);
  }

  async getPrice(groupId: any): Promise<any> {
    let params = {};
    if (groupId) {
      params = { group_id: groupId };
    }
    return await this.get("get_price", params);
  }
}

export default GetAPI;

const shopApi = new GetAPI(); // ShopAPIのインスタンスを作成

shopApi.getShops().then((data) => {
  console.log(data);
});

//shopApi.getGroup(1).then((data) => {
//  console.log(data);
//});

//shopApi.getStock(1).then((data) => {
//  console.log(data);
//});
