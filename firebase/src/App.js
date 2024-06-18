import React from 'react';
import Users from './components/Users';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import { useContext } from 'react';
import Product from './components/Product';
import ProductListByCategory from './components/ProductListByCategory';
import Cart from './components/Cart';
import { AuthContext } from './context/AuthContext';
import Socket from './components/Socket';
import store from './redux-store/store';
import { Provider } from 'react-redux';
import Profile from './components/Profile';
import Register from './components/Register';
function App() {

const {currentUser}=useContext(AuthContext)
console.log(currentUser.email)
const RequireAuth=({children})=>{
   return currentUser?children:<Navigate to="/"/>
}

const AdminAuth=({children})=>{
  return currentUser.email!=='maheshgumma18@gmail.com'?<Navigate to="/home"/>:children
}


  return (
    <div className="App">
    <Provider store={store}>
      <BrowserRouter>
      <Routes>

     <Route path="/home" element={<RequireAuth><Home/></RequireAuth>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/users" element={<AdminAuth><Users/></AdminAuth>}/>
      <Route path="/product" element={<Product/>}/>
      <Route path="/productlist" element={<ProductListByCategory/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/socket" element={<Socket/>}/>
      <Route path="/myprofile" element={<Profile/>}/>
      <Route path="/register" element={<Register/>}/>


      </Routes>
      
      
      
      
      </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
