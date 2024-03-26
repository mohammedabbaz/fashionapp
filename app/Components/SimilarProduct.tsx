"use client";

import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import Link from "next/link";
import { getSimilarProduct } from "../utils/Api/productApi";
import { Product } from "../utils/types/product";

export default function SimilarProduct({ product }: { product: Product }) {
  const [Products, setProducts] = useState<Product[]>([]);

  function getProducts() {
    getSimilarProduct(product?.attributes.categories.data[0].id as number).then(
      (value: any) => {
        setProducts(
          value.data.data.filter((item: Product) => item.id != product.id)
        );
      }
    );
  }

  // use effect to fetsh data
  useEffect(() => {
    getProducts();
  }, [product?.attributes.categories.data[0].id]);

  return (
    <>
      {Products.length != 0 && (
        <section className="w-full h-full mt-12  ">
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl   ">
            Similar Products
          </h2>

          <ul className="mt-8 grid gap-4  sm:grid-cols-2 lg:grid-cols-4 text-start  w-full">
            {Products.map((product, index) => (
              <ProductCard key={index} product={product!} />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
