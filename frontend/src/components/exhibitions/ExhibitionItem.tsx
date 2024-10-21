import React, {useState, useEffect} from 'react';
import styles from './ExhibitionItem.module.css';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";

interface ExhibitionItemProps {
    imageSrc: string;
    title: string;
    subTitle: string;
    link: string;
}

const ExhibitionItem: React.FC<ExhibitionItemProps> = ({imageSrc, title, subTitle, link}) => {
    const [isLoaded, setIsLoaded] = useState(false); // 이미지 로딩 상태 관리

    useEffect(() => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            setIsLoaded(true); // 이미지가 로드되면 로딩 상태 변경
        };
    }, [imageSrc]);

    return (
        <div className={styles.item}>
            <a href={link} className={styles.link}>
                <div className={styles.image__wrap}>
                    {!isLoaded ? (
                        <LoadingSpinner/>
                    ) : (
                        <img src={imageSrc} alt={title} className={styles.image}/> // 이미지 로드 완료 시 이미지 표시
                    )}
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
