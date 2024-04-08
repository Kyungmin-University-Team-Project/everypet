import React from 'react';
import styles from './Home.module.css';
import Maincarousel from '../../components/home/Maincarousel';

const Home = () => {
  return (
    <div>
      <Maincarousel />
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
      <div className={styles.box}></div>
    </div>
  );
};

export default Home;
