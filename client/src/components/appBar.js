import * as React from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCookies } from 'react-cookie';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import { useSelector, useDispatch } from 'react-redux';
import { initializeCart, addToCart } from '../states/cartSlice';

const pages = ['dashboard', 'books', 'orders'];
const settings = ['Profile', 'Customer', 'Author', 'Logout'];


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['cart']);
  //const [numOfItem, setNumOfItem] = useState(0)
  let numOfItem = useSelector(state => state.cart.ids ? Object.keys(state.cart.ids).length:0)
  //let numOfItem = 0
  const dispatch = useDispatch()
  
 /*  const fetchData = () =>{
    if(cookies.cart){
      useDispatch(initializeCart(cookies.cart))
    }
    else{
      useDispatch(initializeCart([]))
    }
  }
 */

  useEffect(()=>{
    if(cookies.cart){
      dispatch(initializeCart(cookies.cart))
    }
    else{
      dispatch(initializeCart({}))
    }
  },[])
  
/*   useEffect(() => {
    if(cookies.cart){
      //setNumOfItem(cookies.cart.length)
      setNumOfItem(Object.keys(cookies.cart).length)

    }
    
  },[cookies]); */

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <nav>
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
           
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
           <Link to='/books' style={{textDecoration: 'none', color: 'inherit'}}>Next Book Store</Link> 
          </Typography>
          
         {/*  -----------------show only on extra small screen ----------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            > 
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography  style={{textDecoration: 'none', color: 'inherit'}} textAlign="center" component={Link} to={`/${page}`}>{page}</Typography> 
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/*  -----------------END show only on extra small screen ----------------- */}
           {/*  -----------------show only on extra small screen ----------------- */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            NBS
          </Typography>
          {/*  -----------------END show only on extra small screen ----------------- */}
          
          {/*  -----------------show only on medium and above screen ----------------- */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={Link} to={`/${page}`}
              >
                {page}
              </Button>
            ))}
          </Box>
            {/*  -----------------END show only on medium and above screen ----------------- */}
          <Box sx={{ flexGrow: 0}}>
            <Link to='/cart' style={{ color: '#FFF' }}>
            <IconButton sx={{mr: 2}} size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={numOfItem} color="error">
                <ShoppingCartIcon fontSize='inherit'/>
              </Badge>
            </IconButton>
            </Link>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
    </nav>
  );
}
export default ResponsiveAppBar;