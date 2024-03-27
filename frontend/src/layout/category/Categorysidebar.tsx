import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Categorysidebar.module.css';
import { RootState } from '../../redux/store/rootReducer';
import { setClickedCategory } from '../../redux/features/categorySlice';

const categories = [
  { name: '쿠폰/기획전', link: '/page1' },
  { name: '타임딜', link: '/page2' },
  { name: '강아지', link: '/page3' },
  { name: '고양이', link: '/page4' },
  { name: '설치류', link: '/page5' },
  { name: '조류', link: '/page6' },
  { name: '파충류', link: '/page7' },
];

const CategorySidebar = () => {
  const clickedCategory = useSelector(
    (state: RootState) => state.category.clickedCategory
  );
  const dispatch = useDispatch();

  const handleClick = (category: string) => {
    dispatch(setClickedCategory(category));
  };

  return (
    <div className={styles.sidebar}>
      <h2>Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Link
              to={category.link}
              className={clickedCategory === category.name ? styles.active : ''}
              onClick={() => handleClick(category.name)}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
