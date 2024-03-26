"use client"
import ProductDetails from "@/app/Components/ProductDetails";
import ProductImages from "@/app/Components/ProductImages";
import SimilarProduct from "@/app/Components/SimilarProduct";
import { getProductById } from "@/app/utils/Api/productApi";
import { useCartContsext } from "@/app/utils/Providers/StateContext";
import { Product } from "@/app/utils/types/product";
import { useEffect, useState } from "react";

export default  function page({ params }: { params: { id: number } }) {

  const [product, setProduct] = useState<Product>();

 

  // function to fetsh data

  function getProduct() {
    getProductById(params.id).then((value: any) => {
      setProduct(value.data.data);
    });
  }

  // use effect to fetsh data
  useEffect(() => {
    getProduct();
  }, [params.id]);

  

  return (
    <div className="container mb-4 space-y-4">
      {/* <div className="flex flex-col w-full  "> */}
      <div className="grid md:grid-cols-2 py-4 gap-8 w-full">
        {/* images gallery */}
        <ProductImages product={product as Product} />
        {/* product details */}

        <ProductDetails product={product as Product} />
     
      </div>
      {/* similar product  */}
      <SimilarProduct  product={product as Product}/>
    </div>
    // </div>
  );
}
