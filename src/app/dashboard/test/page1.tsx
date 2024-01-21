/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Filler,
  Tooltip,
  Legend
);

import { Line } from "react-chartjs-2"; // BarからLineに変更
import React, { useRef } from "react";
import { faker } from "@faker-js/faker";

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      type: "line", // 折れ線グラフのみを表示
      label: "Dataset 2",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      borderColor: "rgba(53, 162, 235, 0.8)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: true, // 線の下を塗りつぶす
      tension: 0.4 
    },
  ],
};

export default function test() {
  const ref = useRef(null);;
  return (
    <div className="h-[720px] w-full">
      <Line data={data} options={{ maintainAspectRatio: false }} />
    </div>
  );
}
