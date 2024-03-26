"use client"
import Image from "next/image";
import { Slider } from "./Components/Slider";
import FeaturedProduct from "./Components/FeaturedProduct";
import Categories from "./Components/Categories";

export default function Home() {
  return (
   <div className="w-full container">
      <Slider/>
      <FeaturedProduct type="Feautured Products"/>
      <Categories/>
      <FeaturedProduct type="Tranding Products"/>

   </div>
  );
}
