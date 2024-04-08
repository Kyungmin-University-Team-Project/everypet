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
  { name: '쿠폰/기획전', link: '/page1' },
  { name: '타임딜', link: '/page2' },
  { name: '강아지', link: '/page3' },
  { name: '고양이', link: '/page4' },
  { name: '설치류', link: '/page5' },
  { name: '조류', link: '/page6' },
  { name: '파충류', link: '/page7' },
];

const Productcategory = () => {
  const dispatch = useDispatch();

  const clickedCategory = useSelector(
    (state: RootState) => state.category.clickedCategory
  );

  const [isOpen, toggleSidebar] = useToggle(false); // ToggleUtil 사용

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      dispatch(setClickedCategory(''));
    }
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
        <Categorybarbtn toggle={toggleSidebar} />
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
      <Categorymodal isOpen={isOpen} toggle={toggleSidebar} />
    </div>
  );
};

export default Productcategory;
