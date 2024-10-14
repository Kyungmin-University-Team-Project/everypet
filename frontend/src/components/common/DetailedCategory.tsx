import React from 'react';
import styles from './DetailedCategory.module.css';
import ItemList from "./ItemList";
import {useDispatch} from "react-redux";
import {setClickedCategory} from "../../redux/features/categorySlice";

interface CategoryDetail {
    name: string;
}

interface DetailedCategoryProps {
    details: CategoryDetail[];
}

const DetailedCategory: React.FC<DetailedCategoryProps> = ({ details }) => {
    const dispatch = useDispatch();

    // 카테고리 이름 출력 핸들러
    const handleClick = (name: string) => {
        dispatch(setClickedCategory(name));
    };

    return (
        <div>
            <div className={styles.container}>
                {details.map((detail, index) => (
                    <div
                        key={index}
                        className={styles.item}
                        onClick={() => handleClick(detail.name)} // 클릭 시 해당 카테고리 이름 출력
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
