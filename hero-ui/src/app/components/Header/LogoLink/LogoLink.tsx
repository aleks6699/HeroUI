import Image from "next/image";
import NavLink from "next/link";
export function LogoLink() {
  return (
    <NavLink href="/" className="text-lg font-semibold hover:text-gray-300 hover:scale-105 flex items-center transition">
      <Image src="/dog.png" alt="Logo" height={64} width={64} className="animate-pulse w-auto h-auto" priority />
      <span className="text-xl font-bold ml-2">Hero UI</span>
    </NavLink>
  );
}