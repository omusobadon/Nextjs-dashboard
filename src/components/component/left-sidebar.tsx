"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface LeftSidebarProps {
  buttonText: string;
  contentName: string[];
  styles?: string;
  children?: React.ReactNode;
}

export function LeftSidebar({ buttonText, styles, contentName, children }: LeftSidebarProps) {
  const isSelected = contentName.some(name => styles?.includes(name));
  const [isExpanded, setIsExpanded] = useState(isSelected);

  useEffect(() => {
    setIsExpanded(isSelected);
  }, [isSelected]);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const getSelectedSidebarClass = () => {
    return isSelected
      ? "bg-[#3498db] w-full flex justify-between "
      : "hover:bg-gray-800 w-full flex justify-between";
  };

  return (
    <div>
      <Button
        className={getSelectedSidebarClass()}
        onClick={toggleExpansion}
      >
        {buttonText}
        <ChevronDownIcon
          className={`ml-auto ${isExpanded ? "transform rotate-180" : ""}`}
        />
      </Button>
      {isExpanded && (
        <div className="ml-12">{children}</div>
      )}
    </div>
  );
}

function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
