import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/header/Header';
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
