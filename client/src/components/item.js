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
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';


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


const MyTransition = React.forwardRef(function MyTransition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Item ({book, afterDelete}) {
    const [deleteOpen, setDeleteOpen] = useState(false)
    //const [editOpen, setEditOpen] = useState(false);

    const [removeBook, { data, loading, error}] = useMutation(REMOVE_BOOK)

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
                    <Typography gutterBottom variant="h5" component="div">
                                    {book.title}
                    </Typography>
                   
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
                        <Button size="small" >Edit</Button>
                        <Button size="small" onClick={handleDeleteOpen}>Delete</Button>
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
      
        </Grid>
               
    )
}

export default Item;


//https://mui.com/material-ui/react-list/
//https://mui.com/material-ui/react-dialog/