import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthor: fals,
    email: null,
    name: null,
    count: 0
}

const profileSlice = createSlice({
    name: 'profile', 
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
        },
        updateOrderBy: {
            reducer(state, action){
                state.ordBy = action.payload;
            }
        }
    }, 

})

export const { updateSearch, updateBooks, updateCount, updateOrderBy } = bookSlice.actions

export default bookSlice.reducer;