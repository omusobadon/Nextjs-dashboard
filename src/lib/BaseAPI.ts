import axios from "axios";

export class BaseAPI {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(path: string, params?: any): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/${path}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${path}:`, error);
      throw error;
    }
  }

  async put(path: string, data: any): Promise<any> {
    try {
      const response = await axios.put(`${this.baseUrl}/${path}`, data);
      return response.data;
    } catch (error) {
      // エラー処理
      throw error;
    }
  }
  
  async delete(path: string): Promise<any> {
    try {
      const response = await axios.delete(`${this.baseUrl}/${path}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting data from ${path}:`, error);
      throw error;
    }
  }
}
