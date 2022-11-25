import './App.css';
import ResponsiveAppBar from './components/appBar'
import ItemList from './components/itemList';
import OrdersList from './components/ordersList';
import SignIn from './components/signIn'
import Cart from './components/Cart';

import { Routes, Route } from 'react-router-dom'




function App() {
  return (
    


    <div className="App">
      <ResponsiveAppBar />
      <Routes>
      <Route path='/books' element={<ItemList />}></Route>
      <Route path='/orders' element={<OrdersList />}></Route>
      <Route path='/sigin' element={<SignIn />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      </Routes>  
    </div>
    
  );
}

export default App;
