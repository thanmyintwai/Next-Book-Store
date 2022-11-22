import './App.css';
import ResponsiveAppBar from './components/appBar'
import ItemList from './components/itemList';
import OrdersList from './components/orders';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
      <Route path='/books' element={<ItemList />}></Route>
      <Route path='/orders' element={<OrdersList />}></Route>
      </Routes>  
    </div>
    
  );
}

export default App;
