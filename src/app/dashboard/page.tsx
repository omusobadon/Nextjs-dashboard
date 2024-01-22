"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Header } from "@/components/Haeder/Header";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Title,
  Filler,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  BarElement,
  Filler,
  Tooltip,
  Legend
);
//import { Bar, Line } from "react-chartjs-2";
import React, { useRef } from "react";
//import { faker } from "@faker-js/faker";
//
//const labels = ["January", "February", "March", "April", "May", "June", "July"];
//
//export const data = {
//  labels,
//  datasets: [
//    {
//      label: "Dataset 1",
//      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
//      backgroundColor: "rgba(255, 99, 132, 0.5)",
//    },
//    
//  ],
//};
//
//export const data2 = {
//  labels,
//  datasets: [
//    {
//      type: "line", // 折れ線グラフのみを表示
//      label: "Dataset 2",
//      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
//      borderColor: "rgba(53, 162, 235, 0.8)",
//      backgroundColor: "rgba(53, 162, 235, 0.5)",
//      fill: true, // 線の下を塗りつぶす
//      tension: 0.4 
//    },
//  ]
//};

export default function Dashboard() {
  const ref = useRef(null);
  return (
    <div key="1" className="flex flex-col w-full min-h-screen">
      <Header />
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">トータル</CardTitle>
              <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              {/*<Line data={data2} />*/}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">貸出中</CardTitle>
              <CheckIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              {/*<Bar data={data} />*/}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">顧客</CardTitle>
              <UsersIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
             {/* <Bar data={data} />*/}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">キャンセル</CardTitle>
              <PanelTopCloseIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </CardHeader>
            <CardContent>
              {/*<Bar data={data} />*/}
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">レンタルID</TableHead>
                  <TableHead>名前</TableHead>
                  <TableHead>日付</TableHead>
                  <TableHead className="text-right">ステータス</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>芦沢</TableCell>
                  <TableCell>2023/12/08</TableCell>
                  <TableCell className="text-right">Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">2</TableCell>
                  <TableCell>梅屋</TableCell>
                  <TableCell>2023/12/08</TableCell>
                  <TableCell className="text-right">Active</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">3</TableCell>
                  <TableCell>石川</TableCell>
                  <TableCell>2023/12/08</TableCell>
                  <TableCell className="text-right">Active</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </div>
      </main>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CalendarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function PanelTopCloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <line x1="3" x2="21" y1="9" y2="9" />
      <path d="m9 16 3-3 3 3" />
    </svg>
  );
}

function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
