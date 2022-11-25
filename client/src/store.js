import { configureStore } from "@reduxjs/toolkit";
import booksReducer from './states/booksSlice'
import cartReducer from './states/cartSlice'

export default configureStore({
    reducer: {
        books: booksReducer,
        cart: cartReducer
    }
})