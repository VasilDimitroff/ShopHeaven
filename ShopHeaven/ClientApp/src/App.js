import React, { Component } from 'react';
import { Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import {theme} from './theme';
import NavMenu from './components/NavMenu';
import Home from './components/Home';


export default function App() {
  return (
   <div>
      <NavMenu/>
   </div>
  );
};



/*
const CustomButton = styled(Button)({
  color: "white",
  backgroundColor: theme.palette.primary.main,
});

export default function App() {
  return (
    <Container className='container' sx = {{ backgroundColor: "red", width: "100%",}}>
        <CustomButton variant="contained">BUTTON</CustomButton>
    </Container>
  );
};

*/




/*
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
