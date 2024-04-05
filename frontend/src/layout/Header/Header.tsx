import React, { useEffect, useRef } from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import Searchinput from './Searchinput';
import Usermenu from './Usermenu';
import useToggle from '../../utils/category/ToggleUtil';
import Categorymodal from '../category/Categorymodal';
import Categorybarbtn from '../../components/category/Categorybarbtn';

const Header = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  const [isOpen, toggleSidebar] = useToggle(false); // ToggleUtil 사용

  useEffect(() => {
    const handleScroll = () => {
      if (headerRef.current) {
        const headerY = headerRef.current.getBoundingClientRect().top;
        console.log('Header Y Position:', headerY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className={styles.container}>
        <div className={styles.inner}>
          <div className={styles.logo__wrap}>
            <Categorybarbtn active={false} toggle={toggleSidebar} />
            <Link to='/' className={styles.title}>
              에브리펫
            </Link>
          </div>

          <Searchinput />
          <Usermenu />
        </div>
      </header>
      <Categorymodal isOpen={isOpen} toggle={toggleSidebar} />
    </>
  );
};

export default Header;
