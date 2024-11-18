import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './DetailedCategory.module.css';
import ItemList from "../../components/product/ItemList";
import { DetailedCategoryList } from "../../typings/product";

interface DetailedCategoryProps {
    details: DetailedCategoryList[];
}

const DetailedCategory: React.FC<DetailedCategoryProps> = ({ details }) => {
    const location = useLocation();

    // 현재 URL 경로에서 subcategory 추출
    const currentSubcategory = location.pathname.split('/')[2];

    return (
        <div>
            <div className={styles.container}>
                {details.map((detail, index) => {
                    // 현재 상세 카테고리가 활성화된 상태인지 확인
                    const isActive = currentSubcategory === detail.tag;
                    return (
                        <Link to={detail.link}
                              key={index}
                              className={`${isActive ? styles.active : styles.item}`}
                        >
                            {detail.name}
                        </Link>
                    );
                })}
            </div>
            <ItemList />
        </div>
    );
};

export default DetailedCategory;
