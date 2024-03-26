import { Product } from "../types/product"
import axiosClient from "./axios"

export const getTrendingProducts = async()=>{
        const res = await axiosClient.get('/products?filters[isNew][$eq]=true&populate=*')
        return res.data.data
}


export const getFeaturedProducts = async()=>{
    const res = await axiosClient.get('/products?filters[isNew][$eq]=false&populate=*')
    return res.data.data
}


export const getProductById = (id:number)=> {
    const res =  axiosClient.get(`/products/${id}?populate=*`)
    return res
}


export const getSimilarProduct= async(catid:number)=>{
    const res = await axiosClient.get(`/products?filters[categories][id][$eq]=${catid}&populate=*`)
    return res
}


export const getProductByCategory= async(catid:string , sort:string)=>{
    const res = await axiosClient.get(`/products?filters[categories][title][$eq]=${catid}& sort = price:${sort}&populate=*`)
    return res
}


export const getAllProducts= async()=>{
    const res = await axiosClient.get(`/products?populate=*`)
    return res
}