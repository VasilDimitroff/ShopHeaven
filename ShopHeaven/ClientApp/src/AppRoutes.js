import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import Categories from './components/categories/Categories';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import Home from "./components/home/Home";

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
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
  },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
