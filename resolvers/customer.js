import { prisma } from '../services/graphQL.js'

const associatedOrders = async (parent, args, context, info) =>{
   const data = await prisma.customer.findUnique({ 
        where:  { id: parent.id }
    }).associatedOrders()
    return data
}

export const Customer = {   
    associatedOrders
}