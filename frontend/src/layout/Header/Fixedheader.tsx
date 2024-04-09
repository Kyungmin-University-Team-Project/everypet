import React, { useEffect, useState } from 'react';
import styles from './Fixedheader.module.css';
import Categorymodal from '../category/Categorymodal';
import Usermenu from './Usermenu';
import Searchinput from './Searchinput';
import { Link } from 'react-router-dom';
import useToggle from '../../utils/category/ToggleUtil';
import Categorybarbtn from '../category/Categorybarbtn';

const Fixedheader = () => {
  const [isOpen, toggleSidebar] = useToggle(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트
      if (window.scrollY === 200) {
        toggleSidebar(); // 스크롤이 정확히 200일 때만 토글 함수 호출
        console.log('asdaa');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleSidebar]);

  return (
    <div className={scrollY >= 200 ? styles.open : styles.close}>
      <header className={styles.container__fixed}>
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
    </div>
  );
};

export default Fixedheader;
