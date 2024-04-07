import React, { useEffect, useRef, useState } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import useToggle from '../../utils/category/ToggleUtil';
import Categorymodal from '../category/Categorymodal';
import Categorybarbtn from '../category/Categorybarbtn';
import Searchinput from './Searchinput';
import Usermenu from './Usermenu';

const Header = () => {
  const [isOpen, toggleSidebar] = useToggle(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트

      console.log(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={scrollY < 200 ? styles.container : styles.container__fixed}
      >
        <div className={styles.inner}>
          {scrollY < 200 ? (
            <Link to='/' className={styles.title}>
              에브리펫
            </Link>
          ) : (
            <div className={styles.logo__wrap}>
              <Categorybarbtn active={false} toggle={toggleSidebar} />
              <Link to='/' className={styles.title}>
                에브리펫
              </Link>
            </div>
          )}

          <Searchinput />

          <Usermenu />
        </div>
      </header>
      <Categorymodal isOpen={isOpen} toggle={toggleSidebar} />
    </>
  );
};

export default Header;
