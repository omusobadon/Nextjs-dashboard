// src/app/api/Seat/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

// Seatデータを取得する関数
const getSeatData = async () => {
    // Seatデータのパスを取得
    const filePath = path.join(process.cwd(), 'Seat.json');
    // Seatデータを取得
    const seatData = await fs.readFile(filePath, 'utf8');
    // SeatデータをJSON形式に変換
    const data = JSON.parse(seatData);
    // Seatデータを返す
    return data;
};

// GET HTTPメソッドのための関数を大文字でエクスポート
export const GET = async (request: any) =>{
    //Seatデータを取得
    const seatData = await getSeatData();
    //レスポンスを返す
    return new NextResponse(JSON.stringify(seatData), { status: 200 });
}
