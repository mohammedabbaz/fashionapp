"use client";
import { Minus, Plus, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Product } from "../utils/types/product";
import { useCartContsext } from "../utils/Providers/StateContext";
import { Item } from "@radix-ui/react-select";

export default function ProductDetails({ product }: { product: Product }) {
  // const { toast } = useToast();
  const pathname = usePathname();

  const {
    quantity,
    incQuantity,
    decQuantity,
    AddToCart,
    getProductQuantity,
    CartItems,
    setShowCart,
    
  } = useCartContsext();

  useEffect(() => {
    getProductQuantity(product);
  }, [pathname, product, CartItems]);

  const buyNow = () => {
    AddToCart(product);
    setShowCart(true);
  };

  return (
    <div className="pb-6 flex flex-col space-y-3 text-start">
      {/* title and category name */}
      <div className="mb-2 space-y-2 md:mb-3">
        <h3 className="text-muted-foreground text-sm capitalize leading-3 font-medium">
          {product?.attributes.categories.data[0].attributes.title}
        </h3>
        <h2 className="text-lg md:text-2xl font-semibold">
          {product?.attributes.title}
        </h2>
      </div>
      {/* ratings */}
      <div className="flex mb-2 md:mb-3 gap-3  items-center ">
        <div className="flex gap-2 items-center justify-center rounded-lg bg-primary text-white font-medium px-2 py-1">
          4.5
          <span>
            <Star className="size-4" />
          </span>
        </div>
        {/* rattings */}
        <p className="text-sm text-muted-foreground">52 Rattings</p>
      </div>
      {/* price */}
      <div className="mb-2 md:mb-3">
        <div className="flex gap-3 items-center">
          {/* price  */}
          <span className="font-bold text-xl md:text-2xl">
            $ {product?.attributes.price}
          </span>
          {/* price plus shopping */}
          <span className="line-through text-red-500">
            $ {product?.attributes.oldPrice}
          </span>
        </div>
      </div>

      {/* quantity button  */}

      <div className="flex  gap-4 items-center justify-start">
        <span className="text-sm">Quantity : </span>
        <div className="flex space-x-2 items-center justify-center text-center rounded-lg border ">
          <Button variant={"link"} onClick={decQuantity}>
            <Minus className="size-5" />
          </Button>
          <p className="  text-xl font-bold">{quantity}</p>
          <Button variant={"link"} onClick={incQuantity}>
            <Plus className="size-5" />
          </Button>
        </div>
      </div>
      {/* add to cart button and checkout button */}
      <div className="flex  gap-3 my-6 md:my-12">
        <Button
          disabled={quantity == 0}
          onClick={() => AddToCart(product)}
          className={` text-sm capitalize `}
        >
          Add to cart
        </Button>
        <Button
          disabled={quantity == 0}
          onClick={buyNow}
          className={` text-sm capitalize `}
        >
          Buy now
        </Button>
      </div>
      {/* description  */}
      <div className="flex flex-col gap-2">
        <span className="text-sm">Details : </span>
        <p className="text-base text-gray-500 tracking-wide line-clamp-5">
          {product?.attributes.details[0].children[0].text}
        </p>
      </div>
    </div>
  );
}
