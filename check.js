import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import pkg from 'lodash'
const { fromPairs } =pkg;


/* const org = [ ['User', [ ['email', ['contains', 'apple'] ] ] ] ]
console.log(fromPairs(org))

const fieldLists = ['title', 'User@email']
const filterBy = 'apple'
let OR = fieldLists.map((x) =>{

}) */

/* let obj = ['a','b','contains'] // {a:{b:{c:{}}}
obj.reverse();

const nestedObject = obj.reduce((prev, current) => {
    console.log(prev)
    console.log(current)
    return {[current]:{...prev}}
}, {}); */

//console.log(nestedObject)
/* let givenString = 'customer'
let obj1 = givenString.split('@')
let obj2 = ['a','b'] // {a:{b:{c:{}}}
obj1.reverse();

const nestedObject1 = obj1.reduce((prev, current) => {
    console.log(typeof prev)
    console.log(current)

    return {[current]:{...prev}}
}, {contains: 'apple'});

console.log(nestedObject1) */

/* 
const searchFieldGenerator = (fieldLists, filterBy) =>{

    let OR = fieldLists.map((x) =>{


        let columns = x.split('@')
        columns.reverse()

        const nestedObjct = columns.reduce((prev, current)=>{
            return {[current]:{...prev}}
        }, { contains: filterBy})

        return nestedObjct

    })

    return OR

}
const ordersSearchedByFields = ['id', 'customer@email']
console.log(searchFieldGenerator(ordersSearchedByFields, 'jw')) */

const where = {
        
        "OR": [
            {
                "orderBy": {
                    "email": {
                        "contains": "jw"
                    }
                }
            },{
                "id": {
                    "contains": "jw"
                }
            }
        ], 
        "AND": {
           
        }

    }  
const where1 = {
    "status": "Fai"
} 


const orders = await prisma.order.findMany({
    where, 
})

console.log(orders)