"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="flex items-center  gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="flex-1 left-0 z-0">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              placeholder="Search rentals..."
              type="search"
            />
          </div>
        </form>
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
