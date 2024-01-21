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
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import React, { useState } from "react";
import PutAPI from "@/lib/api_put"; // 適切なパスを設定してください

export function CreateProduct({ groups }) {
  const [formData, setFormData] = useState({
    group_id: "",
    name: "",
    max_people: "",
    qty: "",
    remark: "",
    imgData: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // group_id, max_people, qty を数値として扱う
    if (["group_id", "max_people", "qty"].includes(name)) {
      formattedValue = value === "" ? "" : parseInt(value, 10);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // imgData があれば Base64 に変換、なければそのまま送信
    if (formData.imgData) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.imgData);
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1];
        const productData = {
          ...formData,
          img_data: base64data,
        };
        sendProductData(productData);
      };
    } else {
      sendProductData({ ...formData, img_data: null });
    }
  };

  // 商品データを送信する関数
  const sendProductData = async (productData) => {
    const putApi = new PutAPI();
    try {
      const response = await putApi.putProduct(productData);
      window.location.reload();
      console.log("Product added successfully", response);
      // ここで成功時の処理を追加 (例: フォームをリセットする、通知を表示する等)
    } catch (error) {
      console.error("Error in submitting form:", error);
      // ここでエラー時の処理を追加
    }
  };

  const handleCancel = () => {
    setFormData({
      group_id: "",
      name: "",
      max_people: "",
      qty: "",
      remark: "",
      imgData: null,
    });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(file));
      setFormData({ ...formData, imgData: file });
    } else {
      setImagePreview(null);
      setFormData({ ...formData, imgData: null });
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white"
          variant="outline"
        >
          商品を作成
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[925px]">
        <DialogHeader>
          <DialogTitle>商品の登録</DialogTitle>
          <DialogDescription>ここで商品を登録します。</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
        >
          <div className="grid gap-2">
            <Label htmlFor="productCategory">グループを選択</Label>
            <select
              id="group_id"
              name="group_id"
              value={formData.group_id}
              onChange={handleInputChange}
              className="form-select mt-1 block w-full"
            >
              <option value="">グループを選択</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="productName">商品名</Label>
            <Input
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="productPeople">最大人数</Label>
            <Input
              id="max_people"
              name="max_people"
              required
              type="number"
              value={formData.max_people}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="productQty">個数</Label>
            <Input
              id="qty"
              name="qty"
              required
              type="number"
              value={formData.qty}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="productRemark">説明</Label>
            <Textarea
              id="remark"
              name="remark"
              value={formData.remark}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="productImage">商品画像</Label>
            <Input
              id="img_data"
              name="img_data"
              type="file"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="ml-4">
                <Label className="font-bold text-lg">商品画像 プレビュー</Label>
                <img src={imagePreview} alt="Preview" className="max-w-xs" />
              </div>
            )}
          </div>
          <div className="col-span-2 flex flex-col sm:flex-row gap-2">
            <Button className="bg-zinc-900 text-white" size="lg" type="submit">
              登録
            </Button>
            <DialogClose asChild>
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
