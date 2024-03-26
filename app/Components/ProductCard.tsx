import Link from "next/link";
import React from "react";
import { Product } from "../utils/types/product";


export default function productCard({ product }: { product: Product }) {
  return (
    <Link
      href={"/product/"+product.id}
      className="group block overflow-hidden rounded-2xl border "
    >
      <div className="  p-3 cursor-pointer group relative">
        {/* favorite */}
        <div className=" w-10 h-10 bg-primary/10 flex items-center justify-center rounded-full cursor-pointer absolute top-4 left-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18px"
            className="fill-gray-800 inline-block"
            viewBox="0 0 64 64"
          >
            <path
              d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
              data-original="#000000"
            ></path>
          </svg>
        </div>
        {product.attributes.isNew && (
          <div className="absolute top-4 right-4 text-sm bg-primary w-16 h-5 flex items-center justify-center text-center rounded-lg text-white ">new</div>
        )}
        {/* image */}
        <div className="w-11/12 h-[220px] overflow-hidden mx-auto object-center transition duration-500 group-hover:scale-105 rounded-lg  group-hover:rounded-lg md:mb-2 mb-4">
          <img
            src={product.attributes.images.data[0].attributes.url}
            alt="Product 2"
            className="h-full w-full object-center"
          />
        </div>
        <div className="flex gap-4">
          <h3 className="flex-1  text-lg font-medium line-clamp-1 group-hover:text-primary">
            {product.attributes.title}
          </h3>
          <h4 className="text-lg font-bold ">$ {product.attributes.price}</h4>
        </div>
      </div>
    </Link>
  );
}
