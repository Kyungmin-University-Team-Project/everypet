import React, { useEffect, useState } from 'react';
import styles from '../moreinformation/eatInformation.module.css';

interface EatWellAndEatWellItem {
    imageUrl: string;
}

const EatInformation: React.FC = () => {
    const [eat, setEat] = useState<EatWellAndEatWellItem[]>([]);

    useEffect(() => {
        fetch('/mock/information.json')
            .then((response) => response.json())
            .then((data) => setEat(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []); // Empty dependency array to run only on mount

    const getImageUrl = (imageUrl: string) => {
        try {
            return require(`../../assets/img/moreinformation/${imageUrl}`);
        } catch (error) {
            console.error('Error loading image:', error);
            return '';
        }
    };

    console.log(eat);

    return (
        <div className={styles.box}>
            {eat.map((item, index) => (
                <img key={index} src={getImageUrl(item.imageUrl)} alt='' className='' />
            ))}
        </div>
    );
};

export default EatInformation;
