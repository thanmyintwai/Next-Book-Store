import { prisma } from '../services/graphQL.js'
import { selectedFieldsInBook,booksSearchedByFields,ordersSearchedByFields } from '../config/selectedFields.js';
import { bookSearchFildGenerator, searchFieldGenerator } from '../services/bookHelper.js';

const hello = async (parent, args, context, info) =>{
    console.log(context.req.user)
    return `Hi there ${context.user.name}`
}
/* const orders = async(parent, args, context, info) =>{
    const orders = await prisma.order.findMany()
    return orders
} */
const books = async(parent, args, context, info) =>{
  
    try{
        const where = {}
       
        if(args.filter){
            const filterObjects = bookSearchFildGenerator(booksSearchedByFields, args.filter)
            where.OR = filterObjects
        
        }
        console.log(JSON.stringify(where, null, 4));
        console.log(args.skip)

        const books = await prisma.book.findMany({
            where, 
            skip: args.skip, 
            take: args.take,
            orderBy: args.orderBy
        })

        const count = await prisma.book.count({where, })
        return {
            code: 200, success: true, message: `Success`, "data" : books, "count": count }
        
    }catch(err){
        return {
            code: 400, success: false, message: `Failed`, "data" : null, "count": count }

        }
    }


const orders = async(parent, args, context, info) =>{
   /*  const where = args.filter 
    ? {
        OR: [
            { title: { contains: 'or' } },
            { isbn: { contains: 'or' } }
        ]
    }: {} */
    try{
        const where = {}

      
        if(args.filter){
            const filterObjects = searchFieldGenerator(ordersSearchedByFields, args.filter)
            where.OR = filterObjects
        
        }
        if(args.orderBy){
            where.AND = {
                status: args.orderBy.status
            }
        } 
        console.log(JSON.stringify(where, null, 4));

        const orders = await prisma.order.findMany({
            where, 
            skip: args.skip, 
            take: args.take,
            
        })

        const count = await prisma.order.count({where, })
        return {
            code: 200, success: true, message: `Success`, "data" : orders, "count": count }
        
    }catch(err){
        return {
            code: 400, success: false, message: err, "data" : null, "count": null }

        }
    }

/* 
const orders = async (parent, args, context, info) =>{
    try{
        const where = {} 
        if(args.filter){
            const filterObjects = bookSearchFildGenerator(ordersSearchedByFields, args.filter)
            where.OR = filterObjects
        }

        console.log(where)

        const orders = await prisma.order.findMany({
            where, 
            
        })

        const count = await prisma.order.count({ where, })
        return {
            code: 200, success: true, message: `Success`, "data" : orders, "count": count 
        }


    }catch(err){
        return {
            code: 400, success: false, message: err, "data" : null, "count": null }

        }
    }

     */


const book = async(parent, {bookId}, context, info) =>{
    try{

        const lookedBook = await prisma.book.findUnique({
            where: {
                id: bookId,
            }, 
        })
        console.log(lookedBook)
      
          const updatedBook =  await prisma.book.update({
                where: {
                    id: bookId,
                }, data: {
                    views: {
                        increment: 1,
                    },
                },
            }) 
            return {
                code: 200, success: true, message: `Success`, "data" :updatedBook 
              }
    }
    catch(err){
        return {
            code: 400, success: false, message: err, "data": null
          }
    }
    
}

const order = async(parent, {orderId}, context, info) =>{
    try{

        const lookedOrder = await prisma.order.findUnique({
            where: {
                id: orderId,
            }, 
        })
      
    
            return {
                code: 200, success: true, message: `Success`, "data" :lookedOrder 
              }
    }
    catch(err){
        return {
            code: 400, success: false, message: err, "data": null
          }
    }
    
}

const booksInCart = async (parent, {booksId}, context, info) =>{
    try{

    
        const booksInCart = await prisma.book.findMany({
            where: {
                id: { in: booksId },
            }, 
        })
        return {
            code: 200, success: true, message: `Success`, "data" :booksInCart 
          }
    }catch(err){
        return {
            code: 400, success: false, message: err, "data": null
          }
    }
}

export const Query = {
    hello, 
    book,
    books,
    order,
    orders,
    booksInCart
}
