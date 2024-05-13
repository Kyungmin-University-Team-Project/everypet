import React from 'react';
import Header from '../../layout/Header/Header';
import Fixedheader from '../../layout/Header/Fixedheader';
import Productcategory from '../../layout/category/Productcategory';

const ProductPage = ({ category }: any) => {
  return (
    <div>
      <Fixedheader />
      <Header />
      <Productcategory />
      <div>{category}</div>
    </div>
  );
};

export default ProductPage;
