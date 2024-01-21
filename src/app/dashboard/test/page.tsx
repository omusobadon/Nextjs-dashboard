"use client";
import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Page() {
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    productPrice: "",
    product_remark: "",
    product_qty: "",
    productCategory: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.substr(0, 5) === "image") {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSelectChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      productGroup: e.target.value,
    }));
  };
  const handleCancel = () => {
    // フォームのデータをリセットする
    setFormData({
      productName: "",
      productPrice: "",
      product_remark: "",
      product_qty: "",
      productGroup: "",
    });
    setImagePreview(null);
    // 必要に応じてダイアログを閉じる処理を追加
  };
  return (
    <div className="w-full">
      <Label htmlFor="invalid_duration">終了時間</Label>
      <Select
        name="invalid_duration"
        value={formData.invalid_duration}
        onChange={handleSelectChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="時間を選択" />
        </SelectTrigger>
        <SelectContent>
          {/* 時間のリストを生成 */}
          {Array.from({ length: 24 }).map((_, hour) => (
            <SelectItem key={hour} value={`${hour}:00`}>
              {`${hour}:00`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
