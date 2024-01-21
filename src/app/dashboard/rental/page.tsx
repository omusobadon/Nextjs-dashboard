"use client";

import React, { useEffect, useRef, useState, ComponentType } from "react";
import { Header } from "@/components/Haeder/Header";
import { LeftSidebar } from "@/components/component/left-sidebar";
import {
  //商品管理
  ProductPage,
  StockPage,
  //予約管理
  ReservationPage,
  ReservationCarPage,
  ReservationMoviePage,
  ReservationSeatPage,
  ResSchedule,
  //売上管理
  EarningsPage,
  //Not Foundページ
  NotFoundComponent,
} from "@/components/RentalDisplay/RenderContent"; // 他のコンポーネントも同様にインポート
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { SideLink } from "@/components/ui/Sidebar-Links";

const CONTENT_COMPONENTS: { [key: string]: React.ComponentType } = {
  //商品管理
  ProductPage: ProductPage,
  StockPage: StockPage,
  //予約管理
  ReservationPage: ReservationPage,
  ReservationCarPage: ReservationCarPage,
  ReservationMoviePage: ReservationMoviePage,
  ReservationSeatPage: ReservationSeatPage,
  ResSchedule: ResSchedule,
  //売上管理
  EarningPage: EarningsPage,
  //Not Foundページ
  NotFoundComponent: NotFoundComponent,
  // Add other components here
};

export default function Rental() {
  const searchParams = useSearchParams();
  const contentName = searchParams.get("name");
  const [selectedContent, setSelectedContent] = useState(
    contentName || "ProductPage"
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      CONTENT_COMPONENTS[selectedContent] ||
      CONTENT_COMPONENTS["NotFoundComponent"];
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
    <div>
      <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex" style={{ height: "calc(100vh - 64px)" }}>
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
            contentName={["ProductPage", "StockPage", "OtherPage"]}
            buttonText="商品管理"
          >
            <SideLink name="ProductPage" sidebarHelpers={sidebarHelpers}>
              商品
            </SideLink>
            <SideLink name="StockPage" sidebarHelpers={sidebarHelpers}>
              在庫
            </SideLink>
            <SideLink name="OtherPage" sidebarHelpers={sidebarHelpers}>
              その他
            </SideLink>
          </LeftSidebar>
          <LeftSidebar
            contentName={[
              "ReservationPage",
              "ReservationCarPage",
              "ReservationMoviePage",
              "ReservationSeatPage",
              "ResSchedule",
              "CancelPage",
              "CleaningPage",
            ]}
            styles={selectedContent}
            buttonText="レンタル管理"
          >
            <SideLink name="ReservationPage" sidebarHelpers={sidebarHelpers}>
              予約
            </SideLink>
            <SideLink name="ReservationCarPage" sidebarHelpers={sidebarHelpers}>
              予約(車ver.)
            </SideLink>
            <SideLink
              name="ReservationMoviePage"
              sidebarHelpers={sidebarHelpers}
            >
              予約(映画ver.)
            </SideLink>
            <SideLink
              name="ReservationSeatPage"
              sidebarHelpers={sidebarHelpers}
            >
              予約(座席ver.)
            </SideLink>
            <SideLink name="ResSchedule" sidebarHelpers={sidebarHelpers}>
              予約表
            </SideLink>
            <SideLink name="CancelPage" sidebarHelpers={sidebarHelpers}>
              キャンセル
            </SideLink>
            <SideLink name="CleaningPage" sidebarHelpers={sidebarHelpers}>
              清掃
            </SideLink>
          </LeftSidebar>
          <LeftSidebar
            contentName={[
              "EarningsPage",
              "OperatingPage",
              "GoogleAnalticsPage",
            ]}
            styles={selectedContent}
            buttonText="売上管理"
          >
            <SideLink name="EarningsPage" sidebarHelpers={sidebarHelpers}>
              売上
            </SideLink>
            <SideLink name="OperatingPage" sidebarHelpers={sidebarHelpers}>
              経費
            </SideLink>
            <SideLink name="GoogleAnalticsPage" sidebarHelpers={sidebarHelpers}>
              Google Analtics
            </SideLink>
          </LeftSidebar>
        </div>
        <div className="flex-grow" style={{ overflowY: "auto" }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
