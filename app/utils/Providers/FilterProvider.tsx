"use client";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product";
import { getAllProducts, getProductByCategory } from "../Api/productApi";
import { fetshCategories } from "../Api/CategoryApi";
import { Category } from "../types/Category";

const filterContext = createContext<any | undefined>(undefined);

export  function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setselectedCategory] = useState("");
  const [products, setproducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [sorting, setSorting] = useState("");
  const [showall, setshowall] = useState(false);

 


    // get all products  if no chose any filter
    const getproductsByCategory = () => {
      getProductByCategory(selectedCategory , sorting).then((item) => setproducts(item.data.data));
     
    };
  

  // fetsh all categories
  const getCategories = () => {
    fetshCategories().then((item) => setCategories(item.data.data));
  };

// use effect will no shose any filter
  useEffect(() => {
    getCategories();
  }, []);




  // use effect will category changed
  useEffect(() => {
    getproductsByCategory();
    console.log(sorting)
  }, [selectedCategory , sorting]);



  return (
    <filterContext.Provider
      value={{
        categories,
        selectedCategory,
        setselectedCategory,
        products,
        setSorting,
        sorting,
        setshowall
      }}
    >
      {children}
    </filterContext.Provider>
  );
}


export function useFilterContext() {
  return useContext(filterContext);
}

