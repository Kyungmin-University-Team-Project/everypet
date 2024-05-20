import React from 'react';
import styles from './Quicknav.module.css';

const categories = [
  { name: '핫딜', image: require('../../../assets/img/quicknav/hot.png') },
  {
    name: '기간세일',
    image: require('../../../assets/img/quicknav/imminent.png'),
  },
  { name: '신상품', image: require('../../../assets/img/quicknav/new.png') },
  { name: '강아지', image: require('../../../assets/img/quicknav/dog.png') },
  { name: '고양이', image: require('../../../assets/img/quicknav/cat.png') },
  {
    name: '설치류',
    image: require('../../../assets/img/quicknav/hamster.png'),
  },
  {
    name: '설치류',
    image: require('../../../assets/img/quicknav/hamster.png'),
  },
  {
    name: '설치류',
    image: require('../../../assets/img/quicknav/hamster.png'),
  },
];

const Quicknav = () => {
  return (
    <div className={styles.quick__nav__container}>
      <nav className={styles.quick__nav}>
        {categories.map((category, index) => (
          <div key={index} className={styles.quick__nav__item}>
            <img
              className={styles.img}
              src={category.image}
              alt={category.name}
            />
            <span>{category.name}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Quicknav;
