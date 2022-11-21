import { configureStore } from "@reduxjs/toolkit";
import booksReducer from './states/booksSlice'

export default configureStore({
    reducer: {
        books: booksReducer 
    }
})