import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import useToggle from '../../utils/category/ToggleUtil';
import Categorymodal from '../category/Categorymodal';
import Searchinput from './Searchinput';
import Usermenu from './Usermenu';
import Fixedheader from './Fixedheader';

const Header = () => {
  const [isOpen, toggleSidebar] = useToggle(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

      <Categorymodal isOpen={isOpen} toggle={toggleSidebar} />
    </>
  );
};

export default Header;
