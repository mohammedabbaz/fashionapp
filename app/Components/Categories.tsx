import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Category } from "../utils/types/Category";

import { useFilterContext } from "../utils/Providers/FilterProvider";

export default function Categories() {
 
  const {categories} = useFilterContext()

  return (
    <div className="flex flex-col">
      <h2 className="text-xl font-bold  sm:text-3xl">Categories</h2>

      <div className="grid grid-cols-2  mt-8 md:grid-cols-4 auto-rows-[200px]  gap-4">
        {categories.map((item:Category, index:number) => (
          <Link
            key={index}
            href={"/products/"+item.attributes.title}
            className={` group flex items-center justify-center border relative  rounded-lg ${
              index == 0 && " md:row-span-2"
            } ${index == 4 && " md:col-span-2"} `}
          >
            <h3 className="absolute top-0 z-10 inset-0 inset-y-0 h-10 w-20 bg-white bottom-0    p-2 rounded-lg  flex justify-center items-center  ">
              {item.attributes.title}
            </h3>
            <div className=" h-full w-full mx-auto relative">
            <img
              src={item.attributes.image.data.attributes.url}
              alt=""
              className="   object-cover object-center  overflow-hidden h-full w-full    transition duration-500 group-hover:scale-105 rounded-lg  "
            />

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
