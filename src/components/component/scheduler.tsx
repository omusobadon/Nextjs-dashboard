import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

export default function Schedule() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">商品名</TableHead>
          <TableHead>0時</TableHead>
          <TableHead>1時</TableHead>
          <TableHead>2時</TableHead>
          <TableHead>3時</TableHead>
          <TableHead>4時</TableHead>
          <TableHead>5時</TableHead>
          <TableHead>6時</TableHead>
          <TableHead>7時</TableHead>
          <TableHead>8時</TableHead>
          <TableHead>9時</TableHead>
          <TableHead>10時</TableHead>
          <TableHead>11時</TableHead>
          <TableHead>12時</TableHead>
          <TableHead>13時</TableHead>
          <TableHead>14時</TableHead>
          <TableHead>15時</TableHead>
          <TableHead>16時</TableHead>
          <TableHead>17時</TableHead>
          <TableHead>18時</TableHead>
          <TableHead>19時</TableHead>
          <TableHead>20時</TableHead>
          <TableHead>21時</TableHead>
          <TableHead>22時</TableHead>
          <TableHead>23時</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>商品1</TableCell>
          <TableCell colSpan={24} />
        </TableRow>
        <TableRow>
          <TableCell>商品2</TableCell>
          <TableCell colSpan={24} />
        </TableRow>
        <TableRow>
          <TableCell>商品3</TableCell>
          <TableCell colSpan={24} />
        </TableRow>
        <TableRow>
          <TableCell>商品4</TableCell>
          <TableCell colSpan={24} />
        </TableRow>
        <TableRow>
          <TableCell>商品5</TableCell>
          <TableCell colSpan={24} />
        </TableRow>
        <TableRow>
          <TableCell>商品6</TableCell>
          <TableCell colSpan={24} />
        </TableRow>
        <TableRow>
          <TableCell>商品7</TableCell>
          <TableCell colSpan={24} />
        </TableRow>
      </TableBody>
    </Table>
  );
}
