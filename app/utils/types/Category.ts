
export interface Category {
       id: number
    attributes: {
        title: string
        createdAt: string
        updatedAt: string
        publishedAt: string
        image: {
            data:{ attributes: {
               url: string
             }}
            
           }
      }
      
  }
  
