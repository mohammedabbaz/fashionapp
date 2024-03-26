import axiosClient from "./axios"

export const fetshCategories = async()=>{
    const res = await axiosClient.get('/categories?populate=*')
    return res
}