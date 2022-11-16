import { 
    calculateTotal, 
    updateTotal, 
    updateBooksInOrder,
    getBooksToUseInOperations,
    updateStatusInOrder,

} from '../services/orderHelper.js';
import { prisma } from '../services/graphQL.js'
import { selectedFieldsInBook } from '../config/selectedFields.js';

import { stringUpdate, numberUpdate } from '../services/bookHelper.js';

const logout = (parent, args, context) => { context.logout() }

const addBook = async (parent, args, context, info) =>{
        const {title, pages, isbn, price } = args.details
        try{
            const  data = await prisma.book.create({
                data: {
                  title,
                  pages,
                  isbn, 
                  price
                },select: selectedFieldsInBook
              }) 

              return {
                code: "200", success: true, message: `Success`, "data" :data 
              }

        }catch(err){
            return {
                code: "400", success: false, message: err, "data": null
              }
        }
  }

/*   const updatedOrder = await prisma.order.update({
    where: {
        id: parseInt(orderId)
    },
    data: {
      books
    },select: selectedFieldsInOrder
}) */

/* const updateBook = async(parent, {bookId, details}, context, info)  =>{
    try{
        let keys = details.keys()
        keys.forEach(async key => {
            await prisma.book.update({
                where: {
                    id: bookId
                }, data: {

                }
            })
        })
    }catch(err){

    }
} */

const updateBook = async (parent, { bookId, details }, content, info) =>{
  
  
    try{ 
        let keys = Object.keys(details)
        await Promise.all(
                keys.map(async (k) => {
                    //assume it is price or pages
                    if(Number.isInteger(details[k])){
                        await numberUpdate(bookId, details[k], k)
                    }else {
                        await stringUpdate(bookId, details[k], k)
                    }
                })
        )
        const lookedBook = await prisma.book.findUnique({
            where: {
                id: bookId,
            }, 
        })
        
        console.log('ok')
        return { code: 200, success: true, message: `Success`, "data": lookedBook }

    }catch(err){
        return { code: 400, success: false, message: err, "data": null }      

    }
}
 
const addOrder = async (parent, args, context, info) =>{
      
        try{
            const  {customerId, books} = args.details
            let objectsToAdd = books.map(reqb => { return { "id" : reqb }} )
            let total = await calculateTotal(books, prisma)

            const ordData = await prisma.order.create({
                data: {
                    total: total._sum.price, 
                    orderBy: {
                        connectOrCreate: {
                            where: {
                                id: customerId
                            }, 
                            create: {
                                firstName: 'than', lastName: 'Wyne', email: "tw@kmail.com",
                                address: "2/2420, Thynne Road, Morningside", postCode: 4001, city: "Brisbane", country: "AU"
                            },
                        },
                    },
                    books: {
                        connect: objectsToAdd,
                    },
                }, 
            })
            return { code: 200, success: true, message: `Success`, "data": ordData }
        }catch(err){
            return { code: 400, success: false, message: `Fail`, "data": null }      
        }
    }

/* const updateOrder = async (parent, {orderId, books, status}, context, info) =>{
        try{
              console.log(orderId)
              const [objectsToAdd, objectsToRemove] = await getBooksToUseInOperations(books, orderId, prisma)
              console.log(objectsToAdd)
              console.log(objectsToRemove)
              ///await updateBooksInOrder(parseInt(orderId), toDisconnect, prisma, "REMOVE")
              await updateBooksInOrder(parseInt(orderId), objectsToRemove, prisma, "REMOVE")
              
              ///let total = await calculateTotal(updateBooks, prisma)
              let total = await calculateTotal(books, prisma)
              await updateTotal(parseInt(orderId), total._sum.price, prisma)

              ///const updatedOrder = await updateBooksInOrder(parseInt(orderId), toConnect,prisma, "ADD") 
              const updatedOrder = await updateBooksInOrder(parseInt(orderId), objectsToAdd, prisma, "ADD") 
              
             
            return {
                code: 200, success: true, message: `Success`, "order": updatedOrder
              }

        }catch(err){
            return {
                code: 400, success: false, message: err, "order": null
              }
        }
    
    } */

const updateOrder = async(parent, { orderId, books, statusTo}, context, info ) =>{

    if(books){
        console.log('book given')
    }
    if(statusTo){
        console.log('status operation given')
    }

      if(!books && !statusTo){
        return {
            code: 400, success: false, message: 'Failed', "order": null
          }
      }
      if(statusTo){
        await updateStatusInOrder(orderId, statusTo.status, prisma)
      }
      if(books)
      {
        console.log(orderId)
        const [objectsToAdd, objectsToRemove] = await getBooksToUseInOperations(books, orderId, prisma)
        console.log(objectsToAdd)
        console.log(objectsToRemove)
        ///await updateBooksInOrder(parseInt(orderId), toDisconnect, prisma, "REMOVE")
        await updateBooksInOrder(parseInt(orderId), objectsToRemove, prisma, "REMOVE")
                
        ///let total = await calculateTotal(updateBooks, prisma)
        let total = await calculateTotal(books, prisma)
        await updateTotal(parseInt(orderId), total._sum.price, prisma)

        //const updatedOrder = await updateBooksInOrder(parseInt(orderId), toConnect,prisma, "ADD") 
       await updateBooksInOrder(parseInt(orderId), objectsToAdd, prisma, "ADD") 
      }

      const updatedOrder = await prisma.order.findUnique({
        where: {
            id: orderId
        }
      })
      return {
        code: 200, success: true, message: `Success`, "data": updatedOrder
      }
}

const removeOrder = async (parent, { orderId }, context, info) =>{
        try{
            await prisma.order.delete({
                where: {
                    id: parseInt(orderId)
                }
            })

            return {
                code: 200, success: true, message: `Success`
            }

        }catch(err){
            return {
                code: 400, success: false, message: `Fail`
            }
        } 
    }

const removeBook = async (parent, { bookId}, context, info) =>{
    try{
        await prisma.book.delete({
            where: {
                id: bookId
            }
        })
        return {
            code: 200, success: true, message: `Success`
        }
    }catch(err){
        return {
            code: 400, success: false, message: `Failed`
        }
    }
}

export const Mutation = {
    logout, 
    addBook, 
    addOrder, 
    updateOrder,
    removeOrder,
    updateBook,
    removeBook
}