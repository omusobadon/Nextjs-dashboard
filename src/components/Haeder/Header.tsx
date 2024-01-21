"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { ShopProps } from "@/lib/TableInterface";
import { useFetchData } from "@/lib/useFetchData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GetAPI from "@/lib/api_get";

export function Header({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen?: boolean;
  toggleSidebar?: () => void;
}) {
  const handleToggle = () => {
    if (toggleSidebar) {
      // 外部から渡されたトグル関数がある場合
      toggleSidebar();
    } else {
      // デフォルトのトグル動作
      setIsMenuOpen(!isMenuOpen);
    }
  };

  const [selectedShopDetails, setSelectedShopDetails] =
    useState<ShopProps | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shops, setShops] = useState<ShopProps[]>([]);
  const [selectedShop, setSelectedShop] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("selectedShopId") || "1";
    }
    return "1";
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const shop = shops.find((s) => s.id.toString() === selectedShop);
    setSelectedShopDetails(shop || null);
  }, [selectedShop, shops]);

  useEffect(() => {
    // localStorageから選択された店舗IDを取得
    const storedSelectedShop = localStorage.getItem("selectedShopId");
    if (storedSelectedShop) {
      setSelectedShop(storedSelectedShop);
    }
  }, []);

  // 選択された店舗IDが変更されたときにローカルストレージを更新する
  useEffect(() => {
    // ローカルストレージに保存されている値を取得
    const storedShopId = localStorage.getItem("selectedShopId");

    if (selectedShop && selectedShop !== storedShopId) {
      // ローカルストレージに新しい値を保存
      localStorage.setItem("selectedShopId", selectedShop);
      // ページをリロード
      window.location.reload();
    }
  }, [selectedShop]);

  const handleSelectShop = (shopId: string) => {
    setSelectedShop(shopId);
  };

  useEffect(() => {
    const fetchShops = async () => {
      try {
        setIsLoading(true);
        const getApi = new GetAPI(); // ShopAPIのインスタンスを作成
        const fetchedShops = await getApi.getShops(); // getShopsメソッドを呼び出し
        setShops(fetchedShops);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShops();
  }, []);
  return (
    <header className="flex items-center justify-between h-16 px-4 border-b shrink-0 md:px-6">
      <Button
        className="md:hidden"
        size="icon"
        variant="ghost"
        onClick={handleToggle}
      >
        <MenuIcon className="w-6 h-6" />
        <span className="sr-only">メニュー</span>
      </Button>
      <div
        className={`fixed z-10 inset-y-0 left-0 transform bg-[#2c3e50] text-white w-64  overflow-auto transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative`}
      >
        <nav className="flex flex-col gap-3 mt-10 mb-6 text-center md:hidden">
          <button onClick={handleToggle} className="text-white mb-3">
            閉じる
          </button>
          <Link href="/dashboard">ダッシュボード</Link>
          <Link href="/dashboard/rental">総合管理</Link>
          <Link href="/dashboard/customer">顧客</Link>
        </nav>
      </div>
      <nav className="flex-col w-full hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
          href="#"
        >
          <Image
            src="/オムそば丼キャラ切り抜き.png"
            width="50"
            height="50"
            alt="オムそば丼キャラ切り抜き"
          />
          <span className="sr-only">RentIt</span>
        </Link>
        <Link className="font-bold" href="/">
          ダッシュボード
        </Link>
        <Link
          className="text-gray-500 dark:text-gray-400"
          href="/dashboard/rental"
        >
          総合管理
        </Link>
        <Link className="text-gray-500 dark:text-gray-400 " href="#">
          顧客
        </Link>
      </nav>
      <div className="flex md:ml-auto md:gap-2 lg:gap-4">
        <Select
          value={selectedShop} // Select コンポーネントに現在の選択値を渡す
          onValueChange={(shopId) => setSelectedShop(shopId)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a shop" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                shops.map((shop) => (
                  <SelectItem key={shop.id} value={shop.id.toString()}>
                    {shop.name}
                  </SelectItem>
                ))
              )}
            </SelectGroup>
          </SelectContent>
          
        </Select>

        <Button className="rounded-full" size="icon" variant="ghost">
          <Image
            src="/オムそば丼キャラ切り抜き.png"
            width="100"
            height="100"
            alt="オムそば丼キャラ切り抜き"
          />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
