"use client";

import { Navbar, NavbarBrand, NavbarContent } from "@heroui/navbar";

import { LogoLink } from "./LogoLink/LogoLink";
import { NavBarItemLink } from "./NavBarItem/NavBarItem";

export function Header() {
  return (
    <Navbar position="sticky" className="bg-gray-800 text-white">
      <div className="w-full flex justify-around items-center p-4">
        <NavbarBrand>
          <LogoLink />
        </NavbarBrand>
        <NavbarContent className="flex gap-4">
          <NavBarItemLink href="/">Home</NavBarItemLink>
          <NavBarItemLink href="/table">Table</NavBarItemLink>
          <NavBarItemLink href="/list">List</NavBarItemLink>
        </NavbarContent>
      </div>
    </Navbar>
  );
}
