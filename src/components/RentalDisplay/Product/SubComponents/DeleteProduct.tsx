import {
  DialogTrigger,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogContent,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DeleteAPI from "@/lib/api_delete";

export function DeleteProduct({ selectedProducts }) {
  const handleDelete = async () => {
    const deleteApi = new DeleteAPI();
    try {
      for (const productId of selectedProducts) {
        await deleteApi.deleteProduct(productId);
      }
      console.log("Selected products deleted successfully");
      // 成功後の処理（例: 状態の更新や通知の表示など）
    } catch (error) {
      console.error("Failed to delete products:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-red-700 text-white" variant="outline">
          選択した商品を削除
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>選択された以下の物を削除します。</DialogTitle>
          <DialogDescription>
            {selectedProducts}
            削除後復元できません、本当に消しますか？
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>

          <Button className="bg-red-700 text-white" onClick={handleDelete}>
            削除する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
