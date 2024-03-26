"use client";
import { ChevronDown, Heart, MenuIcon, Search, User } from "lucide-react";
import React from "react";
import Logo from "../Logo";
import Link from "next/link";
import { navLinks } from "@/app/utils/constant";
import { Cart } from "./Cart";
import { useFilterContext } from "@/app/utils/Providers/FilterProvider";
import { Category } from "@/app/utils/types/Category";
import { useCartContsext } from "@/app/utils/Providers/StateContext";
import { UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/clerk-react";

export function NavBar() {
  const { categories } = useFilterContext();
  const { user } = useUser();

  return (
    <header className="h-20 py-3  ">
      <div className=" flex items-center justify-between">
        {/* left  */}
        <div className="sm:flex gap-4 items-center justify-center hidden ">
          {/* translate */}
          <div className="flex items-center gap-1">
            <img src="/translate.png" alt="translate image " className="icon" />
            <ChevronDown className="size-3" />
          </div>
          {/* currency */}
          <div className="flex items-center gap-1">
            <h3 className="text-sm font-medium">USD</h3>
            <ChevronDown className="size-3" />
          </div>
          {/* links  */}

          {categories.map((item: Category, index: number) => {
            return (
              <Link
                key={index}
                href={"/products/" + item.attributes.title}
                className="text-sm hover:text-purple-500"
              >
                {item.attributes.title}
              </Link>
            );
          })}
        </div>
        {/* menu mobile icon  */}
        <div className="flex sm:hidden w-1/3 gap-4 items-center justify-start ">
          <MenuIcon className="icon" />
          <Search className="icon" />
        </div>
        {/*  */}
        {/* center */}
        <Logo />

        {/* right  */}
        <div className="flex gap-4 items-center justify-center ">
          <div className="hidden sm:flex gap-4">
            {navLinks.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm hover:text-purple-500"
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* search  */}
          <Search className="icon hidden sm:flex" />

          {/* favorite */}
          <Heart className="icon" />

          {/* cart  */}

          <Cart />

          {/* profile */}

          {!user && (
            <Link className="flex md:flex sm:gap-4  " href="/sign-in">
              <User />
            </Link>
          )}
          <UserButton />
        </div>
      </div>
    </header>
  );
}
