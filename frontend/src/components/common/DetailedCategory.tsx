import React from 'react';
import styles from './DetailedCategory.module.css';

interface CategoryDetail {
  name: string;
}

interface DetailedCategoryProps {
  details: CategoryDetail[];
}

const DetailedCategory: React.FC<DetailedCategoryProps> = ({ details }) => {
  return (
    <div className={styles.grid}>
      {details.map((detail, index) => (
        <div key={index} className={styles.gridItem}>
          {detail.name}
        </div>
      ))}
    </div>
  );
};

export default DetailedCategory;
