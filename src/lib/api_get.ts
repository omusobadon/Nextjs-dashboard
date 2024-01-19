import axios from "axios";
import { ShopProps, APIResponse } from "./TableInterface"; // 適切なパスを設定してください

// APIのベースURL（環境に合わせて設定してください）
const API_BASE_URL = process.env.NEXT_PUBLIC_GOAPI_IP;

// shopデータを取得する関数
export const getShops = async (): Promise<ShopProps[]> => {
  try {
    const response = await axios.get<APIResponse>(`${API_BASE_URL}/get_shop`);
    return response.data.shop;
  } catch (error) {
    // エラーハンドリング（ログ出力、エラーを上位に伝播させるなど）
    console.error("Error fetching shops:", error);
    throw error;
  }
};

export const getManageData = async (shopId: any) => {
  try {
    let url = `${API_BASE_URL}/get_manage`;
    if (shopId) {
      url += `?shop_id=${shopId}`;
    }

    const response = await axios.get(url);
    return response.data; // レスポンスのデータを返す
  } catch (error) {
    console.error("Error fetching manage data:", error);
    throw error; // エラーを再スロー
  }
};
