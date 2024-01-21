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

export function DeleteGroups({ groups }) {
  const handleDeleteGroup = async (groupId) => {
    const deleteApi = new DeleteAPI();
    try {
      await deleteApi.deleteGroup(groupId);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mb-4 bg-red-700 text-white" variant="outline">
          グループを削除
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>グループ{groups.name}を削除します。</DialogTitle>
          <DialogDescription>
            削除後復元できません、本当に{groups.name}を消しますか？
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>

          <Button
            className="bg-red-700 text-white"
            onClick={() => handleDeleteGroup(groups.id)}
          >
            削除する
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
