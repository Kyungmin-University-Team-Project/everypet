import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Categorysidebar.module.css';
import { RootState } from '../../redux/store/rootReducer';
import { setClickedCategory } from '../../redux/features/categorySlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { closeSidebar, toggleSidebar } from '../../redux/features/sidebarSlice';

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
  const dispatch = useDispatch();
  // 여기서 타입의 뜻은 HTMLDivElement의 DOM 요소만 참조한다느 뜻
  const sidebarRef = useRef<HTMLDivElement>(null);

  const clickedCategory = useSelector(
    (state: RootState) => state.category.clickedCategory
  );

  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const handleClick = (category: string) => {
    dispatch(setClickedCategory(category));
  };

  const handleSidebarClose = () => {
    dispatch(closeSidebar());
  };

  const handleOverlayClick = () => {
    dispatch(closeSidebar());
  };

  return (
    <div>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={handleOverlayClick}
      />
      <div
        className={`${styles.container} ${
          isOpen ? styles.containerOpen : styles.containerClosed
        }`}
        ref={sidebarRef}
      >
        <header className={styles.header}>
          <span className={styles.logo}>카테고리</span>
          <FontAwesomeIcon
            icon={faX}
            className={styles.close__btn}
            onClick={handleSidebarClose}
          />
        </header>
        <ul className={styles.ul}>
          {categories.map((category, index) => (
            <li className={styles.li} key={index}>
              <Link
                to={category.link}
                className={
                  clickedCategory === category.name ? styles.active : ''
                }
                onClick={() => handleClick(category.name)}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategorySidebar;
