import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import { useQuery, gql, refetch} from '@apollo/client';
import { useCookies } from 'react-cookie';
import Skeleton from '@mui/material/Skeleton';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux';
import { initializeCart, addToCart, removefromCart, increment,decrement } from '../states/cartSlice';
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

function createRow(desc, qty, unit) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}



const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];



const BOOKS_IN_CART =  gql`
  query BooksQuery($booksId: [String!]!) {
  booksInCart(booksId: $booksId) {
    code
    success
    message
    data {
      id
      price
      title
    }
    count
  }
}
`;

function subtotal(items) {
  //return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  //return Object.keys(items).map(({ price }) => price).reduce((sum, i) => sum + i, 0);
  let sum = 0
  let books = items
  Object.keys(books).forEach((id)=>{
      let total = books[id].price * books[id].requests
      sum = sum + total 
  })  
  return sum
}


function invoiceTaxes(items){
  return TAX_RATE * subtotal(items)
}

function invoiceTotal (items) {
  return subtotal(items) + invoiceTaxes(items)
}


export default function Cart() {
  const [deleteOpen, setDeleteOpen] = useState(false)
  //const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  let bookInCart = useSelector(state => state.cart.ids ? state.cart.ids : {})
  const dispatch = useDispatch()
  const [toRemove, setToRemove] = useState(null)

  /* const { loading, error, data, refetch } = useQuery(BOOKS_IN_CART,{
  });
 */
/*   useEffect(()=>{
    let ids = Object.keys(bookInCart)
    refetch({ 
      booksId: ids
    })
}, [bookInCart])
 */


  
/*   useEffect(() => {
    if(cookies.cart){
      //setNumOfItem(cookies.cart.length)
      setNumOfItem(Object.keys(cookies.cart).length)

    }
    
  },[cookies]); */
  const loadingComponent = () =>{
    return
      <Container sx={{py:5}} maxWidth="lg">
        <Skeleton variant="rectangular" width={700} height={400} />
      </Container>
    
  }

   const removeHandler=(id) =>{
      dispatch(removefromCart(id))
  } 

 
   
  /* if(error)return <p>...error</p>
  if(loading) return <p>...loading</p>
  //if(data) return <p>{data}</p>
 */

  const dataRowsGenerators = (data) =>{
     let bookInCart = data
     let rows = Object.keys(bookInCart).map(id => ( 
      <TableRow key={bookInCart[id]}>
    <TableCell>{bookInCart[id].title}</TableCell>
    <TableCell>
    <Box
      sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
          m: 1,
          },
      }}
      >
      <ButtonGroup variant="outlined" aria-label="outlined button group">
          <Button onClick={() => dispatch(increment(id))}>+</Button>
          <Button>{bookInCart[id].requests}</Button>
          <Button onClick={() => dispatch(decrement(id))}>-</Button>
      </ButtonGroup>
      
      </Box>

    </TableCell>
   
    <TableCell align="right">{ccyFormat(bookInCart[id].price * bookInCart[id].requests)}</TableCell>
    <TableCell align="right">
      <IconButton aria-label="delete" onClick={() => removeHandler(id)}> 
        <DeleteIcon />
      </IconButton>  
    </TableCell>
  </TableRow>
    ))

    return rows
    
  } 

  const handleDeleteOpen = (id) => {
    setToRemove(id)
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleActivateOperation = () =>{
    dispatch(removefromCart(toRemove))
    setDeleteOpen(false)
  }

  return (
    
    <Container sx={{py:5}} maxWidth="lg">
          {console.log(bookInCart)}

     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={4}>
              Details
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Sum</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {/*  { Object.keys(bookInCart) ? dataRowsGenerators(bookInCart) : null } */}
          {
           Object.keys(bookInCart).map(id => ( 
            <TableRow key={bookInCart[id]}>
              <TableCell>{bookInCart[id].title}</TableCell>
              <TableCell>
              <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    '& > *': {
                    m: 1,
                    },
                }}
                >
                <ButtonGroup variant="outlined" aria-label="outlined button group">
                    <Button onClick={() => dispatch(increment(id))}>+</Button>
                    <Button>{bookInCart[id].requests}</Button>
                    <Button onClick={() => dispatch(decrement(id))}>-</Button>
                </ButtonGroup>
                
                </Box>

              </TableCell>
             
              <TableCell align="right">{ccyFormat(bookInCart[id].price * bookInCart[id].requests)}</TableCell>
              <TableCell align="right">
                {/* <IconButton aria-label="delete" onClick={() => removeHandler(id)}> */} 
                <IconButton aria-label='delete' onClick={() => handleDeleteOpen(id)} >
                  <DeleteIcon />
                </IconButton>  
              </TableCell>
            </TableRow> 
              ))
          }
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={3}>Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(subtotal(bookInCart))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTaxes(bookInCart))}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceTotal(bookInCart))}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>  

    <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to remove the following book from the cart"}
        </DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>No</Button>
          <Button onClick={handleActivateOperation} autoFocus>
            Yes
          </Button>
        </DialogActions>
        
      </Dialog>
    </Container>
  );  
}