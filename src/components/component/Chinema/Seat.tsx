import React, { useState } from "react";
import SeatingSection from "@/components/component/Chinema/SeatingSection"; // SeatingSectionのインポートを確認してください
import seatMapData from './seatMapData.json';

export default function Home( { breakpoint, mapsnumber }) {
  const customSeatMap = [];

  const [seatMaps, setSeatMaps] = useState(seatMapData);


  const [productId, setProductId] = useState("1"); // 選択されている product_id
  const [mode, setMode] = useState(mapsnumber); // 選択されているモード（教室か映画館か）

  // product_idが変更されたときのハンドラ
  const handleProductChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setProductId(event.target.value);
  };

  // モードが変更されたときのハンドラ
  const handleModeChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setMode(event.target.value);
  };

  return (
    <div>
      <h1>座席予約</h1>
      <select
        name="product_id"
        id="product_id"
        onChange={handleProductChange}
        value={productId}
      >
        <option value="1">product_id1</option>
        <option value="2">product_id2</option>
        <option value="3">product_id3</option>
      </select>
      <SeatingSection
        productId={productId}
        seatMap={seatMaps[mode as keyof typeof seatMaps]}
        breakpoint={breakpoint}
      />
    </div>
  );
}