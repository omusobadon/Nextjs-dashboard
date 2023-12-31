/**
 * v0 by Vercel.
 * @see https://v0.dev/t/JKkvDqPDwxK
 */
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useFetchAPI } from "@/lib/api-actions";
import FetchLoading from "@/components/component/FetchLoading";

export default function StockPage() {
  const { products, isLoading, error } = useFetchAPI();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 lg:p-8 xl:gap-10">
      <div className="flex items-center justify-center">
        <h1 className="text-lg font-semibold md:text-xl lg:text-2xl xl:text-3xl">
          在庫
        </h1>
      </div>
      <FetchLoading isLoading={isLoading} error={error} colSpan={6} />
      <div className="border shadow-sm rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]" />
              <TableHead>商品名</TableHead>
              <TableHead>カテゴリー</TableHead>
              <TableHead>在庫数</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {!isLoading &&
              !error &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.num}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
