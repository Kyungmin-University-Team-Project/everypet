import React from 'react';
import styles from './ExhibitionItem.module.css';

interface ExhibitionItemProps {
    imageSrc: string;
    title: string;
    subTitle: string;
    link: string;
}

const ExhibitionItem: React.FC<ExhibitionItemProps> = ({imageSrc, title, subTitle, link}) => {
    return (
        <div className={styles.item}>
            <a href={link} className={styles.link}>
                <div className={styles.image__wrap}>
                    <img src={imageSrc} alt={title} className={styles.image}/>
                </div>
                <div className={styles.overlay}>
                    <div className={styles.text}>
                        <h1>{title}</h1>
                        <p>{subTitle}</p>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default ExhibitionItem;
