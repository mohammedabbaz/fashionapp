"use client";



import { useEffect, useState } from "react";
import { Product } from "../utils/types/product";



export default function ProductImages({ product }: { product: Product }) {
  // state to change big image of product

  const [bigImage, setBigImage] = useState<string>(product?.attributes.images.data[0].attributes.url);

  useEffect(() => {
    setBigImage(product?.attributes.images.data[0].attributes.url );
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* big image  */}
      <div className="relative rounded-lg lg:col-span-4 overflow-hidden border shadow p-8">
        <img
          src={bigImage}
          alt="product image "
          width={500}
          height={500}
          className="w-full h-[280px] object-center  "
        />
      </div>

      {/* list of images of product exit in left in large screen and on top in small screen */}
      <div className=" grid grid-cols-4 gap-4 ">
        {product?.attributes.images.data.map((image, index: any) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg  border hover:border-primary shadow  p-2 h-24 "
          >
            <img
              src={image.attributes.url}
              alt="product image "
              width={400}
              height={400}
              className="w-full h-full cursor-pointer object-center"
              // onClick={()=>setBigImage(image)}
              onMouseEnter={() => setBigImage(image.attributes.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
