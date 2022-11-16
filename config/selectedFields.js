export const selectedFieldsInBook = {
    id: true,
    title: true,                    
    pages: true, 
    isbn: true, 
    price: true, 
    views: true, 
    orders: {
        select: {
            id: true, 
            orderDate: true, 
            status: true, 
            total: true, 
            orderBy: {
                select: {
                    id: true, 
                    firstName: true, 
                    lastName: true, 
                    email: true, 
                }
            }
        }
    }
}

export const selectedFieldsInOrder = {
    id: true, 
    status: true, 
    orderDate: true, 
    total: true, 
    orderBy: true, 
    books: true 
}

export const booksSearchedByFields = [ 'title', 'isbn' ] 
export const ordersSearchedByFields = [ "orderBy@email", "id"]
export const fieldsInNumber = ["pages", "price", "views", "postCode", "total"]