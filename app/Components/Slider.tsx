import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function Slider() {
  return (
   <div className="   mx-2  mb-10">
     <Carousel className="w-full  ">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} >
            <div className=" md:h-[calc(100vh-80px)]   h-64 ">
              <Card className="md:h-[calc(100vh-80px)]   h-64 ">
                <CardContent className=" items-center justify-center h-full ">
                  <img src="https://media.fashionnetwork.com/pb10028/10028.jpg" alt=""  className="h-full w-full object-cover object-center" />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
   </div>
  )
}
