import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { theme } from "./theme"
import Home from './components/home/Home';
import Layout from './components/Layout';
import Product from './components/products/Product';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Categories from './components/categories/Categories';
import Admin from './components/administration/Admin';
import AdminCategories from './components/administration/AdminCategories';
import AdminProducts from './components/administration/AdminProducts';
import AdminOrders from './components/administration/AdminOrders';
import AdminDashboard from './components/administration/AdminDashboard';
import AdminUsers from './components/administration/AdminUsers';
import AdminCoupons from './components/administration/AdminCoupons';
import AdminReviews from './components/administration/AdminReviews';
import { categories } from './components/categories';
import { products } from './components/products';
import { coupons } from './components/coupons';

export default function App() {

  return (  
   <div style={{backgroundColor: theme.palette.appBackground.main}}>
      <Routes>
        <Route path="/" element={<Layout/>}>
           <Route path="" element={<Home/>}/>
           <Route path="categories" element={<Categories/>}/>
           <Route path="products/:productId" element={<Product/>}/>
           <Route path="login" element={<Login/>}/>
           <Route path="register" element={<Register/>}/>
           <Route path="admin" element={<Admin/>}>
               <Route path="" element={<AdminDashboard/>}/>
               <Route path="users" element={<AdminUsers/>}/>
               <Route path="products" element={<AdminProducts products={products}/>}/>
               <Route path="categories" element={<AdminCategories categories={categories}/>}/>
               <Route path="coupons" element={<AdminCoupons coupons={coupons}/>}/>
               <Route path="orders" element={<AdminOrders/>}/>
               <Route path="reviews" element={<AdminReviews/>}/>
           </Route>
        </Route>
      </Routes>  
   </div>
  );
};


/*
     {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route categories={categories} products={products} key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          }) }




import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import { Layout } from './components/Layout';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, requireAuth, ...rest } = route;
            return <Route key={index} {...rest} element={requireAuth ? <AuthorizeRoute {...rest} element={element} /> : element} />;
          })}
        </Routes>
      </Layout>
    );
  }
} */
