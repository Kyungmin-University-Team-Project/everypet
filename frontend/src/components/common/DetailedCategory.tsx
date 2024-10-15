import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './DetailedCategory.module.css';
import ItemList from "./ItemList";
import { DetailedCategoryList } from "../../typings/product";

interface DetailedCategoryProps {
    details: DetailedCategoryList[];
}

const DetailedCategory: React.FC<DetailedCategoryProps> = ({ details }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleCategoryClick = (tag: string) => {
        // 현재 URL에 /tag 붙여서 URL만 변경 (페이지 이동 없음)
        navigate(`${location.pathname}/${tag}`, { replace: true });
    };

    return (
        <div>
            <div className={styles.container}>
                {details.map((detail, index) => (
                    <div
                        key={index}  // 인덱스를 키로 사용
                        className={styles.item}
                        onClick={() => handleCategoryClick(detail.tag)}  // 클릭 시 URL 변경
                    >
                        {detail.name}
                    </div>
                ))}
            </div>
            <ItemList />
        </div>
    );
};

export default DetailedCategory;
