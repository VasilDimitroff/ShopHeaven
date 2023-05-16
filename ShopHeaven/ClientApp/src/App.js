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
import AdminCategories from './components/administration/categories/AdminCategories';
import AdminProducts from './components/administration/AdminProducts';
import AdminOrders from './components/administration/AdminOrders';
import AdminDashboard from './components/administration/AdminDashboard';
import AdminUsers from './components/administration/AdminUsers';
import AdminCoupons from './components/administration/AdminCoupons';
import AdminReviews from './components/administration/AdminReviews';
import RequireAuth from './components/auth/RequireAuth';
import PersistLogin from './components/auth/PersistLogin';
import Unauthorized from './components/auth/Unauthorized';
import { categories } from './components/categories';
import { products } from './components/products';
import { coupons } from './components/coupons';
import SubcategoryProducts from './components/products/products-gallery/SubcategoryProducts';

const Roles = {
  User : "User",
  Admin: "Administrator"
}

export default function App() {

  return (  
   <div style={{backgroundColor: theme.palette.appBackground.main }}>
      <Routes>
        {/* public routes */}
        <Route element={<PersistLogin/>}>
          <Route path="/" element={<Layout/>}>
            <Route path="" element={<Home/>}/>
            <Route path="categories/:categoryId" element={<Categories/>}/>
            <Route path="categories/:categoryId/subcategories/:subcategoryId" element={<Categories/>}/>
            <Route path="categories/:categoryId/subcategories/:subcategoryId/products" element={<SubcategoryProducts/>}/>
            <Route path="products/:productId" element={<Product/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="register" element={<Register/>}/>

              {/* admin only routes */}          
              <Route element={<RequireAuth allowedRoles={Roles.Admin} />}>
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

              {/* all catch */}
              <Route path="unauthorized" element={<Unauthorized/>}/>
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
