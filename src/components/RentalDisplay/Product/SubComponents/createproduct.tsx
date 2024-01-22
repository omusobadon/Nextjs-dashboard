import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
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
import Image from "next/image";
import { GroupProps } from "@/lib/TableInterface";

type CreateGroupProps = {
  groups: GroupProps[]; // ここで正しい型を指定
};

interface ProductData {
  group_id: number | "";
  name: string;
  max_people: number | "";
  qty: number | "";
  remark: string;
  img_data: string | null;
}

export function CreateProduct({ groups }: CreateGroupProps) {
  const [formData, setFormData] = useState<ProductData>({
    group_id: "",
    name: "",
    max_people: "",
    qty: "",
    remark: "",
    img_data: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue: number | string = value;

    // group_id, max_people, qty を数値として扱う
    if (["group_id", "max_people", "qty"].includes(name)) {
      formattedValue = value === "" ? "" : parseInt(value, 10);
    }

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // imgData があれば Base64 に変換、なければそのまま送信
    if (formData.img_data) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.img_data as unknown as Blob);
      reader.onloadend = async () => {
        if (reader.result && typeof reader.result === "string") {
          const base64data = reader.result.split(",")[1];
          const productData: ProductData = {
            ...formData,
            group_id: formData.group_id !== "" ? formData.group_id : "", // 直接 string として代入
            img_data: base64data,
          };

          sendProductData(productData);
        } else {
          console.error("Failed to load image");
          // Handle the error appropriately
        }
      };
    } else {
      const productData: ProductData = {
        ...formData,
        group_id: formData.group_id !== "" ? formData.group_id : "", // 直接 string として代入
        img_data: null,
      };

      sendProductData(productData);
    }
  };

  // 商品データを送信する関数
  const sendProductData = async (productData: ProductData) => {
    const putApi = new PutAPI();
    try {
      await putApi.putProduct(productData);
      window.location.reload(); // ここで成功時の処理を追加 (例: フォームをリセットする、通知を表示する等)
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
      img_data: null,
    });
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setImagePreview(URL.createObjectURL(file));

        // ファイルをBase64エンコードした文字列に変換
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          if (reader.result && typeof reader.result === "string") {
            setFormData({ ...formData, img_data: reader.result });
          } else {
            console.error("Failed to load image");
            // エラーハンドリング
          }
        };
      } else {
        setImagePreview(null);
        setFormData({ ...formData, img_data: null });
      }
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
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange(
                  e as unknown as React.ChangeEvent<HTMLInputElement>
                )
              }
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
              value={formData.max_people as number}
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
              value={formData.qty as number}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="productRemark">説明</Label>
            <Textarea
              id="remark"
              name="remark"
              value={formData.remark}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
              }
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
                <Image src={imagePreview} alt="Preview" className="max-w-xs" />
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
