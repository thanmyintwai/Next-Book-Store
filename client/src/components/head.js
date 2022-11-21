import CustomizedInputBase from './searchField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

function Head(){
    const [age, setAge] = useState('')
    return (

    
    <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
            <Stack px={4} direction="row" spacing={3}>
                {/* <Title  elevation={0}>{`12 Books`}</Title>  */}
                <Button variant="contained" color="success">NEW</Button>
                <CustomizedInputBase />
            </Stack>
        </Grid>
        <Grid item xs={6} md={4}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-helper-label">Order By</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={age}
                    label="Age"
                    onChange={()=> console.log('hello')}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Pages</MenuItem>
                    <MenuItem value={20}>Price</MenuItem>
                </Select>
        
        </FormControl>
        </Grid>
    </Grid>
    )
}

export default Head

//https://mui.com/material-ui/react-select/