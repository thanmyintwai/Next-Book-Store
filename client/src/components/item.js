import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import QrCodeIcon from '@mui/icons-material/QrCode';
import SellIcon from '@mui/icons-material/Sell';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';
import { useCookies } from 'react-cookie';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useSelector, useDispatch } from 'react-redux';
import { initializeCart, addToCart } from '../states/cartSlice';

import * as React from 'react';

import { gql, useMutation } from '@apollo/client';

const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!){
  removeBook(bookId:$bookId){
    code
    success
    message
  }
}
`
const CartAlert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



const MyTransition = React.forwardRef(function MyTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Item ({book, afterDelete}) {
    const [deleteOpen, setDeleteOpen] = useState(false)
    //const [editOpen, setEditOpen] = useState(false);

    const [removeBook, { data, loading, error}] = useMutation(REMOVE_BOOK)

    const [cookies, setCookie, removeCookie] = useCookies(['cart']);
    const [open, setOpen] = React.useState(false);

    let bookInCart = useSelector(state => state.cart.ids)

    const dispatch = useDispatch()

 

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };


  const handleDeleteOpen = () => {
    setDeleteOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };

  const handleActivateOperation = () =>{
    removeBook({
      variables: { bookId: book.id }
    })
     /* if(data){
      //setDeleteOpen(false)
      afterDelete()
    }  */
    
  }
  React.useEffect(()=>{
    if(!deleteOpen){
      afterDelete()
    }
  },[deleteOpen])
/*   const handleEditOpen = () =>{
    console.log('i am called')
    setEditOpen(true)
    console.log(editOpen)
  }

  const handleEditClose = () =>{
    setEditOpen(false)
  } */
  const handleAddCart1 = (event) =>{
   
   if(!cookies.cart){
    setCookie('cart', {[book.id]: book.title}, {path:'/'})
    setOpen(true)

   }else{
   
    if(!(book.id in cookies.cart)){
       let org = cookies.cart
      org[book.id] = book.title
      console.log(cookies.cart)
      setCookie('cart', org, {path:'/'})
      setOpen(true) 
    }
   }
   /* if(cookies.cart && !cookies.cart.includes(book.id)){
   
    console.log('top')
   }
   else{
    console.log('bottom')
    setCookie('cart', [book.id], {path: '/'}) 
    
   } */
  
  }

  const handleAddCart = (event) =>{
    if(!(book.id in bookInCart)){
      //dispatch(addToCart(book.id))
      dispatch(addToCart(book))

      //dispatch(addToCart{})
    }
  }
    return (
        
         <Grid item key={book.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://picsum.photos/140"
                    alt="green iguana"
                />
                <CardContent>
                  <Tooltip title={book.title}>
                    <Typography noWrap={true} gutterBottom variant="h5" component="div">
                                    {book.title}
                  </Typography>
                    </Tooltip>
                    <h3>by John W</h3>
                   
                    <List>
                        <ListItem>
                        <ListItemIcon>
                            <SellIcon />
                        </ListItemIcon>
                        <ListItemText primary={`$ ${book.price}`} />
                        </ListItem> 
                       
                        <ListItem>
                        <ListItemIcon>
                            <AutoStoriesIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${book.pages} pages`}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon>
                            <QrCodeIcon />
                        </ListItemIcon>
                        <ListItemText primary={book.isbn}/>
                        </ListItem>

                    </List>
                </CardContent>
                    <CardActions>
                        <IconButton color="primary" aria-label="Delete" onClick={handleDeleteOpen}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={handleAddCart} color="primary" aria-label="add to shopping cart">
                          <AddShoppingCartIcon />
                        </IconButton>

                </CardActions>
            </Card>

            <Dialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to remove the following book from the system"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {book.title}
            { loading? <LinearProgress /> : null }
            { error ?       <Alert severity="error">Couldn't remove the given book</Alert> : null}
            { data ? <Alert severity="success">Successfully deleted</Alert>:null }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>No</Button>
          <Button onClick={handleActivateOperation} autoFocus>
            Yes
          </Button>
        </DialogActions>
        
      </Dialog>
      <Snackbar open={open} autoHideDuration={1600} onClose={handleClose}>
        <CartAlert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully added into cart
        </CartAlert>
      </Snackbar>
        </Grid>
               
    )
}

export default Item;


//https://mui.com/material-ui/react-list/
//https://mui.com/material-ui/react-dialog/