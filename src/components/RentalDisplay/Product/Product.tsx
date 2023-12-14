/**
 * v0 by Vercel.
 * @see https://v0.dev/t/MQoUD5zuCvR
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { GetServerSideProps } from "next";
import type { ProductInt } from "@/lib/Tableinterface";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:8080/manage_get");
  const data = await res.json();
  console.log(data);

  return { props: { products: data.product as ProductInt[] } };
};

interface ProductProps {
  products: ProductInt[];
}

export default function Product({ products }: ProductProps) {
  return (
    <div className="bg-white p-4 sm:p-6 ">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="mb-2 sm:mb-0">
          <div className="text-sm font-medium">在庫率（30日）</div>
          <div className="text-lg font-semibold">100% —</div>
        </div>
        <div className="mb-2 sm:mb-0">
          <div className="text-sm font-medium">在庫最適日数</div>
          <div className="text-lg font-semibold">1 0-30 days</div>
        </div>
        <div className="mb-4 sm:mb-0">
          <div className="text-sm font-medium">商品のABC分析</div>
          <div className="flex items-center">
            <div className="text-lg font-semibold mr-2">¥ 0 A-grade</div>
            <div className="text-lg font-semibold">¥ 0 C-grade</div>
          </div>
        </div>
        <Button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white">
          商品を登録する
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <Button variant="secondary">すべて</Button>
          <Button variant="secondary">アクティブ</Button>
          <Button variant="secondary">下書き</Button>
          <Button variant="secondary">アーカイブ済み</Button>
          <Button variant="secondary">+</Button>
        </div>
        <div className="flex space-x-2">
          <Input className="w-full sm:w-auto" placeholder="検索" />
          <Button variant="secondary">
            <FilterIcon className="text-gray-500" />
          </Button>
          <Button variant="secondary">
            <ListIcon className="text-gray-500" />
          </Button>
          <Button variant="secondary">
            <LayoutGridIcon className="text-gray-500" />
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]" />
            <TableHead>商品名</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>在庫</TableHead>
            <TableHead className="hidden sm:table-cell w-[100px]">
              注文数
            </TableHead>
            <TableHead className="hidden sm:table-cell w-[100px]">
              在庫数
            </TableHead>
            <TableHead className="hidden sm:table-cell w-[100px]">
              マーケット
            </TableHead>
            <TableHead className="hidden sm:table-cell w-[100px]">
              カテゴリー
            </TableHead>
            <TableHead className="hidden sm:table-cell w-[100px]">
              販売元
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*localhost:8080/manage_getから取ってきたProductを表示 
                商品ID = product_id: number
                商品カテゴリ = category: string
                商品名 = name: string
                金額 = value: number
                個数 = num: number
                
            */}
          {products &&
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                {/* 他の列も同様に追加 */}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

function LayoutGridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function ListIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  );
}
