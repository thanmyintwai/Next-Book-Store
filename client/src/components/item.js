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



function Item ({data}) {
    return (
        
         <Grid item key={data.id} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="https://picsum.photos/140"
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                                    {data.title}
                    </Typography>
                   
                    <List>
                        <ListItem>
                        <ListItemIcon>
                            <SellIcon />
                        </ListItemIcon>
                        <ListItemText primary={`$ ${data.price}`} />
                        </ListItem> 
                       
                        <ListItem>
                        <ListItemIcon>
                            <AutoStoriesIcon />
                        </ListItemIcon>
                        <ListItemText primary={`${data.pages} pages`}/>
                        </ListItem>
                        <ListItem>
                        <ListItemIcon>
                            <QrCodeIcon />
                        </ListItemIcon>
                        <ListItemText primary={data.isbn}/>
                        </ListItem>

                    </List>
                </CardContent>
                    <CardActions>
                        <Button size="small">Edit</Button>
                        <Button size="small">Delete</Button>
                </CardActions>
            </Card>
        </Grid>
               
    )
}

export default Item;


