import { prisma } from '../services/graphQL.js'

const orders = async (parent, args, context, info) =>{
    const associatedOrders = await prisma.book.findUnique({ 
        where:  { id: parent.id }
    }).orders()
    console.log(associatedOrders)
    return associatedOrders
}

export const Book = {   
    orders
}