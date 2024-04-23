import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import useToggle from '../../utils/category/ToggleUtil';
import Categorymodal from '../category/Categorymodal';
import Searchinput from './Searchinput';
import Usermenu from './Usermenu';

const Header = () => {
  const [isOpen, toggleOn, toggleOff] = useToggle(false);

  return (
    <>
      <header className={styles.container}>
        <div className={styles.inner}>
          <Link to='/' className={styles.title}>
            에브리펫
          </Link>

          <Searchinput />

          <Usermenu />
        </div>
      </header>

      <Categorymodal isOpen={isOpen} setOpen={toggleOn} setClose={toggleOff} />
    </>
  );
};

export default Header;
