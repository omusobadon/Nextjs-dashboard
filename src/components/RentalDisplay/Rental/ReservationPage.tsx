import { Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import GetAPI from "@/lib/api_get";
import React, { useState, useEffect } from "react";

export default function ReservationPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const shopApi = new GetAPI();
      const selectedShopId = Number(localStorage.getItem("selectedShopId"));
      const manageData = await shopApi.getManageData(selectedShopId);

      const allProducts = manageData.groups.reduce(
        (acc, group) => acc.concat(group.product),
        []
      );
      console.log("All products:", allProducts); // デバッグ情報

      const allStocks = allProducts.reduce((acc, product) => {
        // ここで product が undefined でないことを確認
        if (product && product.price && Array.isArray(product.price)) {
          return acc.concat(product.price.flatMap((p) => p.stock));
        }
        return acc;
      }, []);

      const formattedData = manageData.customers.reduce((acc, customer) => {
        if (customer.order && customer.order.length > 0) {
          const customerOrders = customer.order.map((order) => {
            const stock = allStocks.find((s) => s.id === order.stock_id);
            const product = stock
              ? allProducts.find((p) => p.id === stock.product_id)
              : null;

            console.log(
              `注文ID: ${order.id}, 在庫ID: ${order.stock_id}, 在庫: `,
              stock,
              `商品: `,
              product
            ); // デバッグ情報

            return {
              id: order.id,
              name: customer.name,
              startAt: order.start_at,
              endAt: order.end_at,
              product: product ? product.name : "不明な商品",
              status: order.is_accepted ? "Active" : "Pending",
            };
          });
          return acc.concat(customerOrders);
        }
        return acc;
      }, []);

      setReservations(formattedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>予約</h1>
      <div className="m-10">
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">レンタルID</TableHead>
                <TableHead>名前</TableHead>
                <TableHead>開始日付</TableHead>
                <TableHead>終了日付</TableHead>
                <TableHead>商品</TableHead>
                <TableHead className="text-right">ステータス</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.map((reservation, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {reservation.id}
                  </TableCell>
                  <TableCell>{reservation.name}</TableCell>
                  <TableCell>
                    {new Date(reservation.startAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(reservation.endAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{reservation.product}</TableCell>
                  <TableCell className="text-right">
                    {reservation.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
