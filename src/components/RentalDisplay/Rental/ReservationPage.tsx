import { Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

export default function ReservationPage() {
  return (
    <div>
      <h1>予約</h1>
      <div className="m-10">
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
    </div>
  );
}
