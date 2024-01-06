import axios from 'axios';
import { useState, useEffect } from 'react';
import { ApiResponse, ProductInt, customerInt, orderInt, stockInt, feeInt, paymentInt } from './TableInterface';

export const useFetchAPI = () => {
  const [data, setData] = useState<{
    products: ProductInt[],
    customers: customerInt[],
    orders: orderInt[],
    stock: stockInt[],
    fee: feeInt[],
    payment: paymentInt[],
    isLoading: boolean,
    error: Error | null
  }>({
    products: [],
    customers: [],
    orders: [],
    stock: [],
    fee: [],
    payment: [],
    isLoading: false,
    error: null
  });

  useEffect(() => {
    setData(prevData => ({ ...prevData, isLoading: true }));
    axios.get<ApiResponse>('http://localhost:8080/manage_get')
      .then(response => {
        setData({
          products: response.data.product,
          customers: response.data.customer,
          orders: response.data.order, // ここはAPIのレスポンスに応じて調整してください
          stock: response.data.stock,
          fee: response.data.fee,
          payment: response.data.payment,
          isLoading: false,
          error: null
        });
      })
      .catch(error => {
        setData(prevData => ({
          ...prevData,
          isLoading: false,
          error: error.message || 'データの取得に失敗しました',
          products: [],
          customers: [],
          orders: [],
          stock: [],
          fee: [],
          payment: [],
        }));
      });
  }, []);

  return data;
};

