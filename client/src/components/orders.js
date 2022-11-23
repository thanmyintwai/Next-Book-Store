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

const OrdersList = () => {
    const [value, setValue] = useState('one');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return ( 
        <Container sx={{ py: 5 }} maxWidth="lg">
            <Grid container spacing={2}>
                <Grid px={5} container direction="row" justifyContent="start">
                    <h1>ORDERS</h1>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Stack px={4} direction="row" spacing={3}>
                        {/* <Title  elevation={0}>{`12 Books`}</Title>  */}
                       {/*  <Button variant="contained" color="info">NEW</Button> */}
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
                    <Tab  label="All" />
                    <Tab value="Progress" label="In Progress" />
                    <Tab value="Successful" label="Successful" />
                    <Tab value="Failed" label="Failed" />
                </Tabs>
                </Grid>
    </Grid>
        </Container>
     );
}
 
export default OrdersList