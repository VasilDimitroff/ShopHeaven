import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  
    return (
      <div className='App'>
        <Header/>
          <Outlet/>
        <Footer/>
      </div>
    );
}
