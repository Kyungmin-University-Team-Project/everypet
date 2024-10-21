import React from 'react';
import styles from "./NotFoundProduct.module.css";
import {VscSearchStop} from "react-icons/vsc";

const NotFoundProduct = () => {
    return (
        <div className={styles.container}>
            <div className={styles.noResults}>
                <VscSearchStop className={styles.noResults__icon}/>
                <span className={styles.noResults__text}>검색 결과가 없습니다.</span>
            </div>
        </div>
    );
};

export default NotFoundProduct;