
import {  Query } from './resolvers/query.js';
import { Mutation } from './resolvers/mutation.js';
import { Book } from './resolvers/book.js';
import { Customer } from './resolvers/customer.js';
import { Order } from './resolvers/order.js';
export const resolvers = {
    Query,
    Mutation,
    Book,
    Customer,
    Order, 

   /*  Book : {
        authors: (parent, args, context, info) =>{
            return context.prisma.author.findUnique({ where:{id}})
        }
    },

    Author: {
        books:async (parent, args,context, info) =>{
            const books = await context.primsa.book.findMany()
            return books
        }
    } */
}

