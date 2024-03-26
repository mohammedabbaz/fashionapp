"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Product } from "../types/product";
import { CartItem } from "../types/Cart";




export const CartContext = createContext<any | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {

  const [showCart, setShowCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [totalPrise, settotalPrise] = useState(0);
  const [totalQuantities, settotalQuantities] = useState(0);
  const [CartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    getTotalQuantities();
    getTotalPrice();
  }, [CartItems]);

  // add quantity
  const incQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // remove quantity
  const decQuantity = () =>
    setQuantity((prev) => {
      if (prev > 0){
        return prev - 1;
      }
      return 0
    });

  // addTo cart function

  const AddToCart = async (product: Product) => {
    const checkIsInCart = CartItems.find(
      (cart) => cart.product.id == product.id
    );

    if (!checkIsInCart) {
      const item: CartItem = {
       
        product: product,
        quantity: quantity,
      };
      setCartItems((prev) => [...prev, item]);
    } else {
      const updateId = CartItems.indexOf(checkIsInCart);
      CartItems[updateId].quantity = quantity;

      setCartItems((prev) => [...prev]);
    }
 
  };

  // get product quantity in details page
  const getProductQuantity = (product: Product) => {
    CartItems.map((item) => {
      if (item.product.id == product.id) {
        // return item.quantity
        setQuantity(item.quantity);
      } else {
        setQuantity(0);
      }
    });

    // console.log(quantity);
  };

  // get cart item quantities
  const getTotalQuantities = () => {
    let qty = 0;
    CartItems.map((item) => (qty = qty + item.quantity));
    settotalQuantities(qty);
  };

  // get cart item quantities
  const getTotalPrice = () => {
    let amount = 0;
    CartItems.map(
      (item) => (amount = amount + item.quantity * item.product.attributes.price)
    );
    settotalPrise(amount);
  };

  // function to delete item for cart item

  const deleteCartItem = ({ cartitem }: { cartitem: CartItem }) => {
    const index = CartItems.indexOf(cartitem);
    CartItems.splice(index, 1);
    setCartItems((prev) => [...prev]);
  };

  // function to change quantity in the cart sheet
  const changeQty = ({
    cartitem,
    quantity,
    operation,
  }: {
    cartitem: CartItem;
    quantity: number;
    operation: "+" | "-";
  }) => {
    if (operation == "+") {
      CartItems[CartItems.indexOf(cartitem)].quantity = quantity + 1;
    } else {
      CartItems[CartItems.indexOf(cartitem)].quantity = quantity - 1;
    }
    setCartItems((prev) => [...prev]);
  };

  return (
    <CartContext.Provider
      value={{
        quantity,
        totalPrise,
        CartItems,
        totalQuantities,
        incQuantity,
        decQuantity,
        AddToCart,
        getProductQuantity,
        changeQty,
        deleteCartItem,
        showCart , 
        setShowCart
      }}
    >
      {children}
     
    </CartContext.Provider>
  );
}

export const useCartContsext = () => useContext(CartContext);
