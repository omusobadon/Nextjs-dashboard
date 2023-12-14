"use client";

import React, { useEffect, useRef, useState, ComponentType } from "react";
import { Header } from "@/components/Haeder/Header";
import { LeftSidebar } from "@/components/component/left-sidebar";
import { Product, Earnings } from "@/components/RentalDisplay/RenderContent"; // 他のコンポーネントも同様にインポート
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SideLink } from "@/components/ui/Sidebar-Links";

const CONTENT_COMPONENTS: { [key: string]: React.ComponentType } = {
  Product: Product,
  Earnings: Earnings,
  // Add other components here
};

export default function Rental() {
  const searchParams = useSearchParams();
  const contentName = searchParams.get("name");
  const [selectedContent, setSelectedContent] = useState(
    contentName || "Product"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // サイドバー外のクリックを検出するハンドラ
  const handleClickOutside = (event: MouseEvent) => {
    // event.target を HTMLElement として扱う
    const target = event.target as HTMLElement;

    if (sidebarRef.current && !sidebarRef.current.contains(target)) {
      setIsSidebarOpen(false);
    }
  };

  const getSelectedItemClass = (contentName: string) => {
    return selectedContent === contentName
      ? "text-[#3498db] underline cursor-pointer"
      : "bg-transparent hover:underline cursor-pointer";
  };

  const renderContent = () => {
    const ContentComponent =
      CONTENT_COMPONENTS[contentName] || CONTENT_COMPONENTS["Product"];
    return <ContentComponent />;
  };

  const sidebarHelpers = {
    setSelectedContent,
    getSelectedItemClass,
  };

  // イベントリスナーの設定とクリーンアップ
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <div className="">
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex h-screen ">
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 transform bg-[#2c3e50] text-white w-64 space-y-2 p-5 overflow-auto transition-transform duration-300 ease-in-out ${
            isSidebarOpen || "md:translate-x-0"
          } ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } z-10 md:relative`}
        >
          <nav className="flex flex-col gap-3 mb-6 text-center md:hidden">
            <button onClick={toggleSidebar} className="text-white mb-3">
              閉じる
            </button>
            <Link href="/dashboard">ダッシュボード</Link>
            <Link href="/dashboard/rental">総合管理</Link>
            <Link href="/dashboard/customer">顧客</Link>
          </nav>
          <LeftSidebar
            styles={selectedContent}
            contentName={["Product", "Stock", "Other"]}
            buttonText="商品管理"
          >
            <SideLink name="Product" sidebarHelpers={sidebarHelpers}>
              商品
            </SideLink>
            <SideLink name="Stock" sidebarHelpers={sidebarHelpers}>
              在庫
            </SideLink>
            <SideLink name="Other" sidebarHelpers={sidebarHelpers}>
              その他
            </SideLink>
          </LeftSidebar>
          <LeftSidebar
            contentName={["Reservation", "Cancel", "Cleaning"]}
            styles={selectedContent}
            buttonText="レンタル管理"
          >
            <SideLink name="Reservation" sidebarHelpers={sidebarHelpers}>
              予約
            </SideLink>
            <SideLink name="Cancel" sidebarHelpers={sidebarHelpers}>
              キャンセル
            </SideLink>
            <SideLink name="Cleaning" sidebarHelpers={sidebarHelpers}>
              清掃
            </SideLink>
          </LeftSidebar>
          <LeftSidebar
            contentName={["Earnings", "Operating", "GoogleAnaltics"]}
            styles={selectedContent}
            buttonText="売上管理"
          >
            <SideLink name="Earnings" sidebarHelpers={sidebarHelpers}>
              売上
            </SideLink>
            <SideLink name="Operating" sidebarHelpers={sidebarHelpers}>
              経費
            </SideLink>
            <SideLink name="GoogleAnaltics" sidebarHelpers={sidebarHelpers}>
              Google Analtics
            </SideLink>
          </LeftSidebar>
          <LeftSidebar
            contentName={["Toilet", "Progress", "Hmm"]}
            styles={selectedContent}
            buttonText="うんこ"
          >
            <SideLink name="Toilet" sidebarHelpers={sidebarHelpers}>
              トイレ
            </SideLink>
            <SideLink name="Progress" sidebarHelpers={sidebarHelpers}>
              進捗
            </SideLink>
            <SideLink name="Hmm" sidebarHelpers={sidebarHelpers}>
              うーん
            </SideLink>
          </LeftSidebar>
        </div>
        <div className="flex-grow">{renderContent()}</div>
      </main>
    </div>
  );
}
