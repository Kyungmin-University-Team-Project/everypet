import React from 'react';
import styles from './Home.module.css';
import Maincarousel from '../../components/home/banner/Maincarousel';
import Quicknav from '../../components/home/quicknav/Quicknav';

const Home = () => {
  return (
    <div>
      <Maincarousel />
      <Quicknav />
    </div>
  );
};

export default Home;
