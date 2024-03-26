"use client";
import { ShoppingCart, Trash } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCartContsext } from "@/app/utils/Providers/StateContext";
import { CartItem } from "@/app/utils/types/Cart";


export function Cart() {
  const {
    totalQuantities,
    CartItems,
    totalPrise,
    changeQty,
    deleteCartItem,
    setShowCart,
    showCart,
  } = useCartContsext();

  // check out function

  const handleCheckOut = async () => {
    try {
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
      );

      if (!stripe) throw new Error("Stripe failed to initialize.");

      const checkoutResponse = await fetch(
        "http://localhost:3000/api/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cartItems: CartItems }),
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((res) => {
          if (res.session) {
            stripe.redirectToCheckout({ sessionId: res.session.id });
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Sheet
      open={showCart}
      onOpenChange={(value) => {
        setShowCart(value);
      }}
    >
      <SheetTrigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingCart className="icon" />
          {totalQuantities !== 0 && (
            <span className=" size-4 p-2 rounded-full flex items-center justify-center bg-primary text-sm text-white absolute -top-2 -right-2">
              {totalQuantities}
            </span>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Shopping cart</SheetTitle>
        </SheetHeader>
        {totalQuantities == 0 ? (
          <div className="h-full w-full flex flex-col gap-2 items-center justify-center">
            <ShoppingCart className="size-20" />
            <h3 className="text-xl font-bold"> Shopping cart empty </h3>
          </div>
        ) : (
          <div className="grid  max-h-full overflow-y-auto space-y-3  ">
            {/* cart items */}
            <div className="grid gap-4 py-4 ">
              {CartItems.map((item: CartItem, index: number) => {
                return (
                  <div key={index} className="relative shadow">
                    <li className="flex  justify-between w-full  ">
                      {/* image  */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            item.product.attributes.images.data[0].attributes
                              .url
                          }
                          alt="Nike Air Force 1 07 LV8"
                          className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                        />
                      </div>
                      {/* details */}

                      <div className="flex flex-col  w-1/3">
                        <h3 className="text-sm">
                          {item.product.attributes.title}
                        </h3>

                        {/* price  */}

                        <div className="flex">
                          <p className="text-xs font-medium text-gray-500 line-through">
                            $ {item.product.attributes.oldPrice}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            $ {item.product.attributes.price}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-green-500">
                          ${" "}
                          {item.product.attributes.oldPrice -
                            item.product.attributes.oldPrice * 100}
                        </p>
                      </div>
                      {/* buttons  */}
                      <div className="min-w-24 flex items-center justify-center">
                        <button
                          onClick={() =>
                            changeQty({
                              quantity: item.quantity,
                              cartitem: item,
                              operation: "-",
                            })
                          }
                          type="button"
                          className="h-7 w-7"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="mx-1 h-7 w-9 rounded-md border text-center"
                          value={item.quantity}
                        />
                        <button
                          onClick={() =>
                            changeQty({
                              quantity: item.quantity,
                              cartitem: item,
                              operation: "+",
                            })
                          }
                          type="button"
                          className="flex h-7 w-7 items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </li>
                    {/* remove button  */}
                    <Button
                      variant={"ghost"}
                      size={"icon"}
                      onClick={() => deleteCartItem(item)}
                    >
                      <Trash className="size-4 cursor-pointer absolute top-0 right-0" />
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col sticky z-20 bg-white  bottom-0 left-0 right-0 py-8 gap-4">
              <p className="flex justify-between items-center">
                Total amount:
                <span className="font-semibold">${totalPrise}</span>
              </p>
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  className="rounded-md  px-3 py-2 text-sm font-semibold  "
                >
                  Back to shop
                </Button>
                <Button
                  onClick={() => handleCheckOut()}
                  type="button"
                  className="rounded-md  px-3 py-2 text-sm font-semibold  "
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
