import React from 'react';
import styles from './Categorysidebar.module.css';

const CategorySidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Categories</h2>
      <ul>
        <li>
          <a href='#' className={styles.active}>
            Category 1
          </a>
        </li>
        <li>
          <a href='#'>Category 2</a>
        </li>
        <li>
          <a href='#'>Category 3</a>
        </li>
        <li>
          <a href='#'>Category 4</a>
        </li>
        <li>
          <a href='#'>Category 5</a>
        </li>
      </ul>
    </div>
  );
};

export default CategorySidebar;
