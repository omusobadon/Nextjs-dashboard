import Scheduler from "@/components/component/scheduler";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

export default function ResSchedule() {
  return (
    <div className="">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%] border ">商品名</TableHead>
            <TableHead className="w-[10%] border">状況</TableHead>
            <TableHead className="w-[10%] border">備考</TableHead>
            <TableHead className="w-[50%] text-center">時間
            <div className="flex gap-[17.6px] items-center justify-center">
                <p>0時</p>
                <p>1時</p>
                <p>2時</p>
                <p>3時</p>
                <p>4時</p>
                <p>5時</p>
                <p>6時</p>
                <p>7時</p>
                <p>8時</p>
                <p>9時</p>
                <p>10時</p>
                <p>11時</p>
                <p>12時</p>
                <p>13時</p>
                <p>14時</p>
                <p>15時</p>
                <p>16時</p>
                <p>17時</p>
                <p>18時</p>
                <p>19時</p>
                <p>20時</p>
                <p>21時</p>
                <p>22時</p>
                <p>23時</p>
              </div></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="border">芦沢</TableCell>
            <TableCell className="border">Active</TableCell>
            <TableCell className="border">2023/12/08</TableCell>
            <TableCell className="border">
              
              <Scheduler />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div></div>
    </div>
  );
}


