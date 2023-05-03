import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Categories from './components/categories/Categories';
import Product from './components/products/Product';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/home/Home";
import Admin from './components/administration/Admin';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/categories',
    element: <Categories />
  },
  {
    path: '/products/:productId',
    element: <Product />
  },
  {
    path: '/admin',
    element: <Admin />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
