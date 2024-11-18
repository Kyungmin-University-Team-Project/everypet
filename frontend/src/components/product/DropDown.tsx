import React from 'react';
import styles from "./DropDown.module.css";

interface DropDownProps {
    orderBy: string,
    handleSortChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
}

const DropDown = ({orderBy, handleSortChange}: DropDownProps) => {
    return (
        <div className={styles.selectContainer}>
            {/* 정렬 드롭다운 */}
            <select className={styles.select} id="sort" value={orderBy} onChange={handleSortChange}>
                <option value="popularity">인기순</option>
                <option value="sales_high">판매량 높은 순</option>
                <option value="sales_low">판매량 낮은 순</option>
                <option value="price_high">가격 높은 순</option>
                <option value="price_low">가격 낮은 순</option>
                <option value="latest">최신순</option>
                <option value="oldest">오래된 순</option>
            </select>
        </div>
    );
};

export default DropDown;