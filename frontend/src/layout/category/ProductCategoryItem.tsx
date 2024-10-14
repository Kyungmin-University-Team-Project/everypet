import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductCategoryItem.module.css';
import { ProductCategoryItemProps } from '../../typings/layout';

const ProductCategoryItem = ({
  category,
  isActive,
  onClick,
  link,
}: ProductCategoryItemProps) => {
  return (
    <li>
      <Link to={link}>
        <button
          className={`${isActive ? styles.active : styles.category}`}
          onClick={() => onClick(category)}
        >
          {category}
        </button>
      </Link>
    </li>
  );
};

export default ProductCategoryItem;
