import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Categorysidebar.module.css';
import { SidebarProps } from '../../typings/layout';
import { CiLock } from 'react-icons/ci';
import { IoCloseOutline } from 'react-icons/io5';

const categories = [
  {
    name: '쿠폰/기획전',
    link: '/page1',
    subCategories: ['카테고리1', '카테고리2', '카테고리3'],
  },
  {
    name: '타임딜',
    link: '/page2',
    subCategories: ['카테고리4', '카테고리5', '카테고리6'],
  },
  {
    name: '강아지',
    link: '/page3',
    subCategories: ['카테고리7', '카테고리8', '카테고리9'],
  },
  {
    name: '고양이',
    link: '/page4',
    subCategories: ['카테고리10', '카테고리11', '카테고리12'],
  },
  {
    name: '설치류',
    link: '/page5',
    subCategories: ['카테고리13', '카테고리14', '카테고리15'],
  },
  {
    name: '조류',
    link: '/page6',
    subCategories: ['카테고리16', '카테고리17', '카테고리18'],
  },
  {
    name: '파충류',
    link: '/page7',
    subCategories: ['카테고리19', '카테고리20', '카테고리21'],
  },
];

const CategorySidebar = ({ isOpen, toggle }: SidebarProps) => {
  const [clickedCategory, setClickedCategory] = useState<string | null>(null);

  const handleClick = (category: string) => {
    setClickedCategory(category);
  };

  const handleSidebarClose = () => {
    toggle();
    setClickedCategory(null);
  };

  return (
    <div>
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
        onClick={handleSidebarClose}
      />
      <div
        className={`${styles.container} ${
          isOpen ? styles.containerOpen : styles.containerClosed
        }`}
      >
        <header className={styles.header}>
          <Link to='/login' className={styles.login__btn}>
            <CiLock/>
            <a>로그인</a>
          </Link>
          <div className={styles.close__btn} onClick={handleSidebarClose}>
            <IoCloseOutline/>
          </div>
        </header>


        <div className={styles.sidebar__group}>
          <span className={styles.sidebar__title}>카테고리</span>
          <ul className={styles.ul}>
            {categories.map((category, index) => (
                <li className={styles.li} key={index}>
                <Link
                  to={category.link}
                  className={
                    clickedCategory === category.name ? styles.active : ''
                  }
                  onMouseEnter={() => handleClick(category.name)}
                >
                  {category.name}
                </Link>
                {clickedCategory === category.name && (
                  <div className={styles.subCategories}>
                    asd
                    {/* {category.subCategories.map((subCategory, subIndex) => (
                        <Link
                          key={subIndex}
                          to={`${category.link}/${subIndex}`}
                        >
                          {subCategory}
                        </Link>
                      ))} */}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
