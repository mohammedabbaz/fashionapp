import axios from "axios"

const url ="http://localhost:1337/api/"

const axiosClient =  
    axios.create({
        baseURL:process.env.NEXT_PUBLIC_API_URL,
        headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_BAackend_Api_Token}`
        }
    })




export default axiosClient