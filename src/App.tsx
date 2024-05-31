import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import './App.css';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import UpdateProduct from './components/UpdateProduct';
import OrderList from './components/OrderList';
import ReviewList from './components/ReviewList';
import CreateOrder from './components/CreateOrder';
import CreateReview from './components/CreateReview';

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update/:id" element={<UpdateProduct />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/create-order" element={<CreateOrder />} />
            <Route path="/create-review" element={<CreateReview />} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
