import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ids: null,
    count: 0
}

const cartSlice = createSlice({
    name: 'cart', 
    initialState, 
    reducers: {
        initializeCart : {
            reducer(state, action){
                state.ids = action.payload
                //state.booksInCart[id] = title
            }
        },
        addToCart : {
            reducer(state, action) {
                //if(!(state.ids.includes(action.payload))){
                //    state.ids.push(action.payload)
                //}
                state.ids[action.payload.id] = { 
                    ...action.payload,
                    "requests": 1
                }
                
            
        }
    },
    removefromCart : {
        reducer(state, action){
            //let index = state.ids.indexOf(action.payload)
            //state.ids.splice(index, 1);
            delete state.ids[action.payload]
        }
    }, 
    increment: {
        reducer(state, action){
            console.log('increment is called')
            console.log(action.payload)
            let id = action.payload
            console.log(state.ids[id]['requests'])
            //let { id } = action.payload
            //state.ids[id]["requests"] += 1
            state.ids[id]['requests'] += 1
        }
    },
    decrement: {
        reducer(state, action){
            console.log('decrement is called')
            let id = action.payload
            console.log(state.ids[id]['requests'])
            if(state.ids[id]['requests'] > 0){
                state.ids[id]['requests'] -= 1
            }
            
    
    }, 
    }
    }
})

export const { initializeCart, addToCart,removefromCart, increment,decrement } = cartSlice.actions

export default cartSlice.reducer;