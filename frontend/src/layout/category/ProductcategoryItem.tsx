import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductcategoryItem.module.css';
import { ProductcategoryItemProps } from '../../typings/layout';

const ProductcategoryItem = ({
  category,
  isActive,
  onClick,
  link,
}: ProductcategoryItemProps) => {
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

export default ProductcategoryItem;
