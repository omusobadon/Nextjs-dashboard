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
import React, { useState, useEffect } from "react";
//API
import GetAPI from "@/lib/api_get";
import DeleteAPI from "@/lib/api_delete";
//SubComponents
import { CreateProduct } from "Rental/Product/SubComponents/createproduct.tsx";
import { CreateGroup } from "Rental/Product/SubComponents/CreateGroup.tsx";
import { DeleteGroups } from "Rental/Product/SubComponents/DeleteGroup.tsx";
import { DeleteProduct } from "Rental/Product/SubComponents/DeleteProduct.tsx";

export default function ProductPage() {
  const [groups, setProducts] = useState([]);
  const [openGroups, setOpenGroups] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleCheckboxChange = (productId, isChecked) => {
    setSelectedProducts((prevSelectedProducts) => {
      if (isChecked) {
        return [...prevSelectedProducts, productId];
      } else {
        return prevSelectedProducts.filter((id) => id !== productId);
      }
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const shopApi = new GetAPI();
        const selectedShopId = Number(localStorage.getItem("selectedShopId"));

        const manageData = await shopApi.getManageData(selectedShopId);
        console.log("Manage Data:", manageData);

        if (manageData && manageData.groups) {
          const allProducts = manageData.groups.flatMap((group) => group);
          setProducts(allProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleGroup = (groupId) => {
    setOpenGroups((prevOpenGroups) => ({
      ...prevOpenGroups,
      [groupId]: !prevOpenGroups[groupId],
    }));
  };
  return (
    <div className="bg-white p-4 sm:p-6 ">
      <div className="flex flex-col sm:flex-row justify-between mb-4">
        <div className="mb-2 sm:mb-0">
          <div className="text-sm font-medium">在庫率(30日)</div>
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
        <div className="flex gap-5">
          <CreateGroup groups={groups} />
          <CreateProduct groups={groups} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4">
        <div className="flex space-x-2 mb-2 sm:mb-0">
          <Button variant="secondary">すべて</Button>
          <Button variant="secondary">アクティブ</Button>
          <Button variant="secondary">アーカイブ済み</Button>
          {selectedProducts.length > 0 && (
            <div className="delete-button">
              <DeleteProduct selectedProducts={selectedProducts} />
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <Input className="w-full sm:w-auto" placeholder="検索" />
        </div>
      </div>
      {groups.map((group) => (
        <div
          key={group.id}
          className="flex flex-col w-full h-full rounded-lg overflow-hidden my-10  dark:bg-gray-800 shadow-lg"
        >
          <Button
            onClick={() => toggleGroup(group.id)}
            className="flex justify-start h-10 p-10 gap-10 bg-stone-100 hover:bg-gray-300 border-b"
          >
            <span
              className={`arrow ${openGroups[group.id] ? "isOpen" : ""}`}
            ></span>
            {group.product &&
              group.product.length > 0 &&
              group.product[0].img_data && (
                <img
                  className="w-10 h-10 rounded-full"
                  src={`data:image/jpeg;base64,${group.product[0].img_data}`}
                  alt="Group Image"
                />
              )}
            {group.name}
          </Button>

          {openGroups[group.id] && (
            <div className="p-4">
              <div className=" flex gap-4">
                <Button
                  className="mb-4 bg-blue-600 text-white"
                  variant="outline"
                >
                  グループを編集
                </Button>
                <div className="delete-button">
                  <DeleteGroups groups={group} />
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]" />
                    <TableHead>名前</TableHead>
                    <TableHead>在庫数</TableHead>
                    <TableHead>値段</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.product &&
                    Array.isArray(group.product) &&
                    group.product.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="w-[50px]">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={(e) =>
                              handleCheckboxChange(product.id, e.target.checked)
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <img
                            className="w-10 h-10 rounded-full"
                            src={`data:image/jpeg;base64,${product.img_data}`}
                            alt="img"
                          />
                          {product.name}
                        </TableCell>
                        <TableCell>{product.qty}</TableCell>
                        <TableCell>
                          {Array.isArray(product.price) &&
                          product.price.length > 0
                            ? `${product.price[0].value}円`
                            : "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      ))}
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
