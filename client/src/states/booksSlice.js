import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searched: '',
    orderedBy: '',
    books: []
}

const bookSlice = createSlice({
    name: 'books', 
    initialState, 
    reducers: {
        updateSearch : {
            reducer(state, action){

                state.searched = action.payload
            }
        }
    }, 

})

export const { updateSearch } = bookSlice.actions

export default bookSlice.reducer;