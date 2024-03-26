"use client"
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getFeaturedProducts, getTrendingProducts } from "../utils/Api/productApi";
import { Product } from "../utils/types/product";

export default  function FeaturedProduct({type}:{type:string}) {


  const [featuredProduct , setfeaturedProduct ] = useState<Product[]>([])


  // get featured product 
  useEffect(() => {
   type==="Feautured Products"?getTrendingProduct():getFeauturedProducts();
  }, []);

  // function to get featured product 
   function getFeauturedProducts() {
     getFeaturedProducts().then((value) => {
      setfeaturedProduct(value)
    });
  }

  // function to get featured product 
  function getTrendingProduct() {
    getTrendingProducts().then((value) => {
     setfeaturedProduct(value)
   });
 }



  return (
    <section className="my-6 md:my-10">
      <div className="mx-auto max-w-screen-xl  lg:px-8">
        <header>
          <h2 className="text-xl font-bold  sm:text-3xl">{type}</h2>

          <p className="mt-4 max-w-md text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor
            fugit natus?
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 place-items-center place-content-center">
          {featuredProduct.map((item, index) => {
            return (
              <li key={index}>
                <ProductCard product={item} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
