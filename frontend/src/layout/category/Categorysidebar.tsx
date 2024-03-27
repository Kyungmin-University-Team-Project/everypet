import React, { useEffect } from 'react';
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

const CategorySidebar = ({ isOpen }: { isOpen: boolean }) => {
  const clickedCategory = useSelector(
    (state: RootState) => state.category.clickedCategory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isOpen);

    const handleClickOutside = (event: any) => {
      const sidebar = document.querySelector(`.${styles.container}`);
      if (sidebar && !sidebar.contains(event.target)) {
        dispatch(toggleSidebar()); // 토글 액션 디스패치
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dispatch]);

  const handleClick = (category: string) => {
    dispatch(setClickedCategory(category));
  };

  return (
    <div className={isOpen ? styles.containerOpen : styles.containerClosed}>
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.logo}>카테고리</span>
          <FontAwesomeIcon
            icon={faX}
            className={styles.close__btn}
            onClick={() => dispatch(closeSidebar())}
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
