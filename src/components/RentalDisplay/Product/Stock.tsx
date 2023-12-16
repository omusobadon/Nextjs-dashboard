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
      <div className="border shadow-sm rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="max-w-[150px] text-xs md:text-sm lg:text-base">
                Product ID
              </TableHead>
              
              <TableHead className="text-xs md:text-sm lg:text-base">
                商品名
              </TableHead>
              <TableHead className="text-xs md:text-sm lg:text-base">
                個数
              </TableHead>
              <TableHead className="text-xs md:text-sm lg:text-base" />
            </TableRow>
          </TableHeader>
          <TableBody>
            <FetchLoading isLoading={isLoading} error={error} colSpan={6} />

            {!isLoading &&
              !error &&
              products.map((products) => (
                // eslint-disable-next-line react/jsx-key
                <TableRow>
                  <TableCell key={products.id}>{products.id}</TableCell>
                  <TableCell>{products.name}</TableCell>
                  <TableCell>{products.num}</TableCell>
                  <TableCell>
                    <button className="px-2 py-1 text-xs rounded-md bg-blue-500 text-white focus:outline-none md:text-sm lg:text-base">
                      Edit
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
