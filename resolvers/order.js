import { prisma } from '../services/graphQL.js'

const books = async (parent, args, context, info) =>{
    const data = await prisma.order.findUnique({ 
        where:  { id: parent.id }
    }).books()
    return data
}

const orderBy = async(parent, args, context, info) =>{
    const data = await prisma.order.findUnique({
        where: { id: parent.id }
    }).orderBy()
    return data
}

export const Order = {   
    books,
    orderBy
}