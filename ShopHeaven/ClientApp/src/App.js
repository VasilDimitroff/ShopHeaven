import { React } from "react";
import { Route, Routes } from "react-router-dom";
import { theme } from "./theme";
import Home from "./components/home/Home";
import Layout from "./components/Layout";
import Product from "./components/products/single-product/Product";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Categories from "./components/categories/Categories";
import Subcategories from "./components/subcategories/Subcategories";
import Admin from "./components/administration/Admin";
import AdminCategories from "./components/administration/categories/AdminCategories";
import AdminProducts from "./components/administration/products/AdminProducts";
import AdminOrders from "./components/administration/AdminOrders";
import AdminDashboard from "./components/administration/AdminDashboard";
import AdminUsers from "./components/administration/users/AdminUsers";
import AdminCoupons from "./components/administration/coupons/AdminCoupons";
import AdminReviews from "./components/administration/AdminReviews";
import AdminSettings from "./components/administration/settings/AdminSettings";
import RequireAuth from "./components/auth/RequireAuth";
import PersistLogin from "./components/auth/PersistLogin";
import AppSettings from "./components/settings/AppSettings";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import SubcategoryProducts from "./components/products/products-gallery/SubcategoryProducts";
import Unauthorized from "./components/auth/Unauthorized";
import {
  adminRole,
  applicationUserRole,
  subcategoryProductsBaseUrl,
  subcategoriesOfMainCategoryBaseUrl,
  allCategoriesUrl,
  loginPath,
  registerPath,
  singleProductBasePath,
  cartPath,
  checkoutPath,
} from "./constants";

export default function App() {
  return (
    <div style={{ backgroundColor: theme.palette.background.default }}>
      <Routes>
        {/* public routes */}
        <Route element={<PersistLogin />}>
          <Route element={<AppSettings />}>
            <Route exact path="/" element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path={`${allCategoriesUrl}`} element={<Categories />} />
              <Route path={`${subcategoriesOfMainCategoryBaseUrl}:categoryId`} element={<Subcategories />}/>
              <Route path={`${subcategoryProductsBaseUrl}:subcategoryId`} element={<SubcategoryProducts />}/>
              <Route path={`${singleProductBasePath}:productId`} element={<Product />}/>
              <Route path={loginPath} element={<Login />} />
              <Route path={registerPath} element={<Register />} />

              {/* authorization needed paths */}
              <Route element={<RequireAuth allowedRoles={[applicationUserRole, adminRole]} />}>
                <Route path={`${cartPath}`} element={<Cart />} />
                <Route path={`${checkoutPath}`} element={<Checkout />} />
              </Route>

              {/* admin only routes */}
              <Route element={<RequireAuth allowedRoles={adminRole} />}>
                <Route path="admin" element={<Admin />}>
                  <Route path="" element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="categories" element={<AdminCategories />} />
                  <Route path="coupons" element={<AdminCoupons />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="reviews" element={<AdminReviews />} />
                  <Route path="settings" element={<AdminSettings />} />
                </Route>
              </Route>

              {/* all catch */}
              <Route path="unauthorized" element={<Unauthorized />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
