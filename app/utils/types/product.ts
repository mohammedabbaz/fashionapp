import {  Category } from "./Category"

export interface Product {
  id: number
  attributes: {
    title: string
  details:[{
   
    children: [{
      text: string
    }]
  }]
  price: number
  isNew: boolean
  createdAt: string
  updatedAt: string
  publishedAt: string
  oldPrice: number
  images: {
   data:[{ attributes: {
      url: string
    }}]
   
  }
  categories: {data:[Category]}
  }
}






