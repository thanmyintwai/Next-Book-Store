import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { updateSearch } from '../states/booksSlice';

export default function CustomizedInputBase() {
  const [search, setSearch ] = useState("")
  const dispatch = useDispatch()

  const handleSearchType = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
  }
  const submitHandle = (event) =>{
    console.log(`currently at searched ${search}`)
    dispatch(updateSearch(search))
  }

  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
    >
        
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by title & isbn"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearchType}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={submitHandle}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}