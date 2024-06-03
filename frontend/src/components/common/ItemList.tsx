import React, {useEffect, useState} from 'react';
import Item from './Item';
import styles from './ItemList.module.css';
import {dogMoreInformation} from "../../typings/dog_more_information";

const ItemList = () => {
    // 아이템 리스트 props로 받기, 해당 데이터는 서버에서 받아옴
    const [items, setItems] = useState<dogMoreInformation[]>([]);

    useEffect(() => {
        // Fetch data once on mount
        fetch('/mock/dog_more_information.json')
            .then(response => response.json())
            .then(data => {
                setItems(data);
            }).catch(e => {
            console.log(e);
        });
    }, []);

    const getImageUrl = (imageUrl: string) => {
        try {
            return require(`../../assets/img/product_image/${imageUrl}`);
        } catch (error) {
            console.error('Error loading image:', error);
            return '';
        }
    };

    return (
        <div className={styles.container}>
            {
                items.map((item, index) => (
                    <Item
                        key={index}
                        name={item.name}
                        price={item.price}
                        discount={item.discount}
                        recommended={item.recommended}
                        reviewCount={item.reviewCount}
                        imageUrl={getImageUrl(item.imageUrl)}
                    />
                ))
            }
        </div>
    );
};

export default ItemList;
