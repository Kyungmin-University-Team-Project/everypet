import React from 'react';
import styles from './Quicknav.module.css';

const categories = [
  {
    name: '타임딜',
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
    name: '조류',
    image: require('../../../assets/img/quicknav/bird.png'),
  },
  {
    name: '파충류',
    image: require('../../../assets/img/quicknav/retail.png'),
  },
];

const Quicknav = () => {
  return (
    <div className={styles.quick__nav__container}>
      <nav className={styles.quick__nav}>
        {categories.map((category) => (
          <div key={category.name} className={styles.quick__nav__item}>
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
