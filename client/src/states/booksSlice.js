import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searched: '',
    orderedBy: '',
    books: null,
    count: 0
}

const bookSlice = createSlice({
    name: 'books', 
    initialState, 
    reducers: {
        updateSearch : {
            reducer(state, action){

                state.searched = action.payload
            }
        },
        updateBooks : {
            reducer(state, action) {
                state.books = action.payload
            }
        },
        updateCount: {
            reducer(state, action) {
                state.count = action.payload
            }
        }
    }, 

})

export const { updateSearch, updateBooks, updateCount } = bookSlice.actions

export default bookSlice.reducer;