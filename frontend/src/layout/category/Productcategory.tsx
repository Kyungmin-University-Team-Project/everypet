// Productcategory.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProductcategoryItem from './ProductcategoryItem';
import styles from './Productcategory.module.css';
import { setClickedCategory } from '../../redux/features/categorySlice';
import { RootState } from '../../redux/store/rootReducer';
import Categorymodal from './Categorymodal';
import useToggle from '../../utils/category/ToggleUtil';
import Categorybarbtn from './Categorybarbtn';
import Realtimekeyword from '../Header/Realtimekeyword';

const categories = [
  { name: '쿠폰/기획전', link: '/coupon' },
  { name: '타임딜', link: '/timesale' },
  { name: '강아지', link: '/dog' },
  { name: '고양이', link: '/cat' },
  { name: '설치류', link: '/rat' },
  { name: '조류', link: '/bird' },
  { name: '파충류', link: '/reptiles' },
];
const Productcategory = () => {
  const dispatch = useDispatch();

  const clickedCategory = useSelector(
    (state: RootState) => state.category.clickedCategory
  );

  const [isOpen, toggleOn, toggleOff] = useToggle(false);

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
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

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(setClickedCategory(''));
    }

    console.log(isOpen);
  }, [location.pathname, dispatch]);

  const handleClick = (category: string) => {
    if (clickedCategory === category) {
      return;
    } else {
      dispatch(setClickedCategory(category));
    }
  };

  return (
    <div>
      <nav className={styles.container}>
        <Categorybarbtn
          isOpen={isOpen}
          setOpen={toggleOn}
          setClose={toggleOff}
        />
        <ul className={styles.category__menu}>
          {categories.map((category, index) => (
            <ProductcategoryItem
              key={index}
              category={category.name}
              isActive={clickedCategory === category.name}
              onClick={handleClick}
              link={category.link}
            />
          ))}
        </ul>
        <Realtimekeyword />
      </nav>
      <Categorymodal isOpen={isOpen} setOpen={toggleOn} setClose={toggleOff} />
    </div>
  );
};

export default Productcategory;
