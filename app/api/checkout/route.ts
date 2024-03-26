

import { CartItem } from "@/app/utils/types/Cart";

import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export const POST = async(request:any )=>{


  const {cartItems} = await request.json()
const data:CartItem[] = cartItems;





  const params ={
    submit_type:"pay",
    line_items: data.map((item:CartItem)=>{
      const image = item.product.attributes.images.data[0].attributes.url as string

 
      const  title = item.product.attributes.title
      const quantity = item.quantity
 

        // console.log( newimage)
        
      return {
         price_data: {
            currency:'usd',
            product_data:{
              name:title,
              images:[image]
            },
            unit_amount:item.product.attributes.price*100
          }, adjustable_quantity: {
              enabled:true,
              minimum:1
          },
          quantity:quantity
      }
       
      
    }),
    mode: 'payment',

    success_url: `${request.url}/success`,
    cancel_url: `http://localhost:3000/`,
  }

 

  const session = await stripe.checkout.sessions.create(params);
  console.log(session)

return NextResponse.json({session:session})




}
