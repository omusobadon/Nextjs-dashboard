import Link from "next/link";

interface SidebarLinksProps {
  name: string;
  children: React.ReactNode;
    sidebarHelpers: {
        setSelectedContent: (name: string) => void;
        getSelectedItemClass: (name: string) => string;
    };
}

export function SideLink({
  name,
  children,
  sidebarHelpers,
}: SidebarLinksProps) {
  return (
    <li>
      <Link
        href={`/dashboard/rental?name=${name}`}
        onClick={() => sidebarHelpers.setSelectedContent(name)}
        className={sidebarHelpers.getSelectedItemClass(name)}
      >
        {children}
      </Link>
    </li>
  );
}
