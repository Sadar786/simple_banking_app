import React from 'react';
import './App.css';
import Footer from './components/Footer';
import Nav from './components/Nav';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './components/SignUp.js';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddCustomer';
import ProductsList from './components/ProductList.js';
import Update from './components/Send.js';
import Profile from './components/Profile';
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductsList/>} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/updates/:_id" element={<Update/>} />
            <Route path="/logout" element={<h1>logout</h1>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
