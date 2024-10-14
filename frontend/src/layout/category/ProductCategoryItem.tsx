import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './ProductCategoryItem.module.css';
import { ProductCategoryItemProps } from '../../typings/layout';

const ProductCategoryItem = ({
                               category,
                               onClick,
                               link,
                               tag
                             }: ProductCategoryItemProps) => {
  const location = useLocation();

  // 현재 URL 경로에서 카테고리 추출
  const currentCategory = location.pathname.split('/')[1];

  // 현재 카테고리가 활성화된 카테고리인지 확인
  const isActive = currentCategory === tag;

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
