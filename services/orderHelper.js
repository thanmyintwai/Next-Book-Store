import pkg from 'lodash'
const { difference } =pkg;
import { selectedFieldsInOrder } from '../config/selectedFields.js';

export const calculateTotal =async (books, prisma) =>{
    const total = await prisma.book.aggregate({
        where: {
            id: { in : books}
        },
        _sum: {
          price: true,
        },
        
      })
      return await total
}

export const updateTotal = async(orderId, updateTotal,  prisma) =>{

    const currentTotal = await prisma.order.findUnique({
        where: {
            id: orderId
        }, select: {
            total: true
        }
    })
    var total = {}
    if(currentTotal.total < updateTotal){
        total['increment'] = Math.abs(currentTotal.total - updateTotal)
       // total: { increment: Math.abs(currentTotal.total - updateTotal) }
    }else{
        total['decrement'] = Math.abs(currentTotal.total - updateTotal)
    }

    console.log(currentTotal)
    
    await prisma.order.update({
        where: {
            id: orderId
        }, data: {
            total
        }
    }) 
}

//operation = 'REMOVE' | 'ADD'
export const updateBooksInOrder = async (orderId, booksTo, prisma, operation) =>{
   /*  books: { disconnect: booksTo }
       books: {    connect: booksTo } */
    let books = { }
    if(operation == 'REMOVE'){ 
        books.disconnect = booksTo
    }else { books.connect = booksTo }

  
    const updatedOrder = await prisma.order.update({
            where: {
                id: parseInt(orderId)
            },
            data: {
              books
            },//select: selectedFieldsInOrder
        })
        return updatedOrder
    
}

export const getBooksToUseInOperations = async (requestedBooks, orderId, prisma) =>{

    const existingBooks = await prisma.order.findUnique({
        where: {
            id: parseInt(orderId)
        }, select: {
            books: {
                select: {
                    id: true
                }
            }
        }
    })

    let pureExistingBooks = existingBooks.books.map(book =>  book['id'])

    const booksToRemove = difference(pureExistingBooks, requestedBooks)
    
    let objectsToAdd = requestedBooks.map(reqb => { return { "id" : reqb }} )
    let objectsToRemove = booksToRemove.map(remb => { return { "id": remb }})

    return [objectsToAdd, objectsToRemove]
}


export const updateStatusInOrder = async (orderId, orderStatus, prisma) =>{
    const data = await prisma.order.update({
        where: {
            id: orderId
        }, data: {
            status: orderStatus
        }
    })

    return data

}