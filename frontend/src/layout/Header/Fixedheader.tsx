import React, { useEffect, useState } from 'react';
import styles from './Fixedheader.module.css';
import Categorymodal from '../category/Categorymodal';
import Usermenu from './Usermenu';
import Searchinput from './Searchinput';
import { Link } from 'react-router-dom';
import useToggle from '../../utils/category/ToggleUtil';
import Categorybarbtn from '../category/Categorybarbtn';
import TopMenu from './TopMenu';

const Fixedheader = () => {
  const [isOpen, toggleOn, toggleOff] = useToggle(false);

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트
      if (isOpen) {
        toggleOff(); // 스크롤 시 모달이 열려있으면 닫기
        console.log('성공');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, toggleOff]);

  return (
    <div className={scrollY >= 200 ? styles.open : styles.close}>
      <header className={styles.container__fixed}>
        <div className={styles.inner}>
          <div className={styles.logo__wrap}>
            <Categorybarbtn
              active={false}
              isOpen={isOpen}
              setOpen={toggleOn}
              setClose={toggleOff}
            />
            <Link to='/' className={styles.title}>
              에브리펫
            </Link>
          </div>

          <Searchinput />

          <Usermenu />
        </div>
      </header>

      <Categorymodal isOpen={isOpen} setOpen={toggleOn} setClose={toggleOff} />
    </div>
  );
};

export default Fixedheader;
