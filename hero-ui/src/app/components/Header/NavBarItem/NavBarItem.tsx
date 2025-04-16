import { cn } from "@/app/utils/cn";
import { usePathname } from "next/navigation";
import NavLink from "next/link";
import { NavbarItem } from "@heroui/navbar";


export function NavBarItemLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <NavbarItem>
      <NavLink
        href={href}
        className={cn(
          "text-lg font-semibold hover:text-gray-300 transition",
          pathname === `${href}` && "text-yellow-400 hover:text-yellow-300"
        )}
      >
        {children}
      </NavLink>
    </NavbarItem>
  );
}
