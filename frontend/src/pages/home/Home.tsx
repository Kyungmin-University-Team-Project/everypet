import React from 'react';
import Header from '../../layout/header/Header';
import { Outlet } from 'react-router-dom';
import Productcategory from '../../layout/category/Productcategory';

const Home = () => {
  return (
    <>
      <Header />
      <Productcategory />
      <Outlet />
    </>
  );
};

export default Home;
