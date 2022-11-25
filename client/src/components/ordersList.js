import { DataGrid } from '@mui/x-data-grid';
import CustomizedInputBase from './searchField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { updateSearch, updateOrderBy,updateBooks, updateCount } from '../states/booksSlice';
import { useSelector, useDispatch } from 'react-redux';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'customer',
        headerName: 'Customer',
        description: 'This column has a value getter and is not sortable.',
        //sortable: false,
        width: 160,
      },
    {
      field: 'date',
      headerName: 'Date',
      width: 150,
      //editable: true,
    },
    {
      field: 'books',
      headerName: 'Books',
      width: 150,
      //editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      //editable: true,
    },
    {
        field: 'total',
        headerName: 'total',
        type: 'number',
        width: 110
    }
    
  ];
  const rows = [
    { id: 1, customer: 'Snow', date: '10/10/2022', books: 35, status: 'Progress'},
    { id: 2, customer: 'Bnow', date: '10/10/2022', books: 42, status: 'Progress'},
    { id: 3, customer: 'Rnow', date: '10/10/2022', books: 45, status: 'Progress'},
    { id: 4, customer: 'Grow', date: '10/10/2022', books: 16, status: 'Progress'},
    { id: 5, customer: 'Broo', date: '10/10/2022', books: 16, status: 'Progress'},
    { id: 6, customer: 'Wroo', date: '10/10/2022', books: 15, status: 'Progress'},
    { id: 7, customer: 'Crow', date: '10/10/2022', books: 44, status: 'Progress'},
    { id: 8, customer: 'Frow', date: '10/10/2022', books: 36, status: 'Progress'},
    { id: 9, customer: 'Rowo', date: '10/10/2022', books: 65, status: 'Progress'},
  ];
const OrdersList = () => {
    const [value, setValue] = useState("All");

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return ( 
        <Container sx={{ py: 5 }} maxWidth="lg">
            {/*--------------------Head----------------------------------*/}
            <Grid container spacing={2}>
                <Grid px={5} container direction="row" justifyContent="start">
                    <h1>ORDERS</h1>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Stack px={4} direction="row" spacing={3}>
                        <CustomizedInputBase />
                    </Stack>
                </Grid>
                <Grid item xs={8} md={6}>
                 <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="secondary"
                    indicatorColor="secondary"
                    aria-label="secondary tabs example"
                >
                    <Tab value="All" label="All" />
                    <Tab value="Progress" label="In Progress" />
                    <Tab value="Successful" label="Successful" />
                    <Tab value="Failed" label="Failed" />
                </Tabs> 
                </Grid>
            {/*--------------------Head END----------------------------------*/}
            {/*--------------------Table START----------------------------------*/}

            <Container sx={{ py: 5 }} maxWidth="lg">
            <Box sx={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pbooksSize={5}
                    rowsPerPbooksOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                />
            </Box>
            </Container>
            {/*--------------------Table END----------------------------------*/}


    </Grid>
        </Container>
     );
}
 
export default OrdersList