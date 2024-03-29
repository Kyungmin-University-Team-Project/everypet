import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import ProductcategoryItem from './ProductcategoryItem';
import styles from './Productcategory.module.css';
import { setClickedCategory } from '../../redux/features/categorySlice';
import { RootState } from '../../redux/store/rootReducer';
import CategorySidebar from './Categorysidebar';

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
    <div className={styles.container}>
      <button className={styles.categorybar}>
        <FontAwesomeIcon icon={faBars} />
      </button>

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
      <CategorySidebar />
    </div>
  );
};

export default Productcategory;
