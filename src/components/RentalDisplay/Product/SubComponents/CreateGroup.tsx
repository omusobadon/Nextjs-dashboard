"use client";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import React, { useState, useEffect } from "react";
import GetAPI from "@/lib/api_get";
import PutAPI from "@/lib/api_put";

export function CreateGroup({ groups }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [selectedShopName, setSelectedShopName] = useState(""); // この行を追加
  const [date, setDate] = React.useState<Date>();
  const [selectedShopId, setSelectedShopId] = useState(""); // selectedShopId の状態変数を追加

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const getApi = new GetAPI();
        const fetchedShops = await getApi.getShops();
        const storedShopId = localStorage.getItem("selectedShopId");

        const selectedShop = fetchedShops.find(
          (shop) => shop.id.toString() === storedShopId
        );

        if (selectedShop) {
          setSelectedShopName(selectedShop.name); // 店舗名を設定
          setSelectedShopId(selectedShop.id.toString()); // selectedShopId を設定
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      }
    };
    fetchShops();
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      shop_id: selectedShopId ? parseInt(selectedShopId, 10) : null, // selectedShopId を整数に変換
    }));
  }, [selectedShopId]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // 数値フィールドの処理
    let processedValue = value;
    if (
      [
        "start_before",
        "invalid_duration",
        "unit_time",
        "max_time",
        "interval",
      ].includes(id)
    ) {
      processedValue = value === "" ? 0 : parseInt(value, 10);
      if (isNaN(processedValue)) {
        processedValue = 0; // 数値変換が不正な場合は0に設定
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: processedValue,
    }));
  };

  const [formData, setFormData] = useState({
    name: "",
    shop_id: "",
    start_before: "",
    invalid_duration: "",
    unit_time: "",
    max_time: "",
    interval: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 空文字列を持つフィールドを除外
    const filteredFormData = Object.fromEntries(
      Object.entries(formData).filter(([key, value]) => value !== "")
    );

    const putApi = new PutAPI();

    try {
      await putApi.putGroup(filteredFormData);
      window.location.reload();
      // 成功時の処理
    } catch (error) {
      console.error("Error in submitting form:", error);
      // エラー時の処理
    }
  };

  const handleCancel = () => {
    // フォームのデータをリセットする
    setFormData({
      name: "",
      shop_id: "",
      start_before: "",
      invalid_duration: "",
      unit_time: "",
      max_time: "",
      interval: "",
    });
    setImagePreview(null);
    // 必要に応じてダイアログを閉じる処理を追加
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
          variant="outline"
        >
          商品グループを作成
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px]">
        <DialogHeader>
          <DialogTitle>グループを作成</DialogTitle>
          <DialogDescription>
            {selectedShopName} のグループを作成します。
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-2">
            <Label htmlFor="name">グループ名</Label>
            <Input
              name="name" // この行を追加
              id="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="start_before">利用可能時間</Label>
            <div className="flex gap-2">
              <div className="w-full">
                <Label htmlFor="start_before">開始時間</Label>
                <Input
                  name="start_before" // この行を追加
                  id="start_before"
                  required
                  type="number"
                  min="0"
                  max="24"
                  value={formData.start_before}
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-full">
                <Label htmlFor="invalid_duration">終了時間</Label>
                <Input
                  name="invalid_duration" // この行を追加
                  id="invalid_duration"
                  required
                  type="number"
                  min="0"
                  max="24"
                  value={formData.invalid_duration}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="unit_time">予約利用利用間隔 (分)</Label>
            <Input
              name="unit_time" // この行を追加
              id="unit_time"
              type="number"
              text="分"
              min="0"
              value={formData.unit_time}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="max_time">最大予約時間 (任意)</Label>
            <Input
              name="max_time" // この行を追加
              id="max_time"
              type="number"
              text="時"
              min="0"
              value={formData.max_time}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interval">清掃時間 (任意)</Label>
            <Input
              name="interval" // この行を追加
              id="interval"
              type="number"
              value={formData.interval}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-span-2 flex flex-col sm:flex-row gap-2">
            <Button className="bg-zinc-900 text-white" size="lg" type="submit">
              登録する
            </Button>
            <DialogClose>
              <Button
                size="lg"
                variant="outline"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
