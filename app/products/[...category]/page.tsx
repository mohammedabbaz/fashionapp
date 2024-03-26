"use client";
import React, { useEffect, useState } from "react";
import FiltreProduct from "../../Components/FiltreProduct";
import { useFilterContext } from "@/app/utils/Providers/FilterProvider";
import ProductCard from "@/app/Components/ProductCard";
import { Product } from "@/app/utils/types/product";

export default function page({ params }: any) {
  const { products, setselectedCategory, selectedCategory, setshowall } =
    useFilterContext();

 
     useEffect(() => {
        setselectedCategory(params.category[0]);
      }, [params.category])


  return (
    <div className="mx-auto max-w-screen-xl px-4  sm:px-6 lg:px-8">
      <header>
        <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
          Product Collection
        </h2>
      </header>

      <div className="grid md:grid-cols-5 mt-4 gap-4">
        {/* filtre  */}
        <div className="col-span-1">
          <FiltreProduct />
        </div>
        {/* list of products  */}
        <div className="col-span-4">
          {products.length == 0 ? (
            <div className="h-[300px]  w-full flex items-center justify-center">
              <p>No product</p>
            </div>
          ) : (
            <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product: Product, index: number) => (
                <ProductCard key={index} product={product} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
