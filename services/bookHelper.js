import { prisma } from './graphQL.js'
import { fieldsInNumber } from '../config/selectedFields.js'

export const stringUpdate = async(bookId, text, column) =>{
    let data = {}
    if(column == 'title'){
        data.title = text
    }else{
     //isbn    
        data.isbn = text
    }
    const result = await prisma.book.update({
        where: {
            id: bookId
        }, data, 
    })

    return result
}

export const numberUpdate = async(bookId, newData, column) =>{
    const {pages, price} = await prisma.book.findUnique({
            where:{
                 id: bookId
            }
            })
    let pagesObj = {}
    let priceObj = {} 
    if(column == 'pages'){
        if(pages < newData){
            pagesObj['increment'] = Math.abs(pages - newData)
        }else{
            pagesObj['decrement'] = Math.abs(pages - newData)
        }
    }else{
        if(price < newData){
            priceObj['increment'] = Math.abs(price - newData)
        }else{
            priceObj['decrement'] = Math.abs(price - newData)
        }
    }
    /* data: {
        pages: {
            increment: 1
        }
    } */
    
    if(column == 'pages'){
        const result = await prisma.book.update({
            where: { id: bookId }, 
            data: { pages: pagesObj }
        })
        return result
    }else{
        const result = await prisma.book.update({
            where: { id: bookId }, 
            data: { price: priceObj } 
        })
        return result
    }
}

export const bookSearchFildGenerator = (fieldLists, filteredBy) =>{
    /* [
        { title: { contains: 'apple'} },
        { isbn: { contains: 'apple'} },
        [ [User, [ [email, [contains, apple] ] ] ] ]
        { User: { email: { contains: 'apple' }}}
    ] */
    let OR = fieldLists.map((x) =>{
        let obj = { [x]: { contains: filteredBy } }
        return obj 
    })
    return OR
    
}

export const searchFieldGenerator = (fieldLists, filterBy) =>{

    let OR = fieldLists.map((x) =>{


        let columns = x.split('@')
        columns.reverse()

        if(x in fieldsInNumber){
            const nestedObjct = columns.reduce((prev, current)=>{
                return {[current]:{...prev}}
            }, { equals: filterBy})
            return nestedObjct
        }

        const nestedObjct = columns.reduce((prev, current)=>{
            return {[current]:{...prev}}
        }, { contains: filterBy})
        return nestedObjct

    })
    console.log(JSON.stringify(OR, null, 4));

    return OR

}