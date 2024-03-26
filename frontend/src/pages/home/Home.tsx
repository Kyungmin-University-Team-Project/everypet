import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Productcategory from '../../layout/category/Productcategory';
import Header from '../../layout/Header/Header';

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
