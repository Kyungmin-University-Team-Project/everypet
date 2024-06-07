import React from 'react';
import {useQuery} from 'react-query';
import Item from './Item';
import styles from './ItemList.module.css';
import {dogMoreInformation} from '../../typings/dog_more_information';
import LoadingSpinner from "../../utils/reactQuery/LoadingSpinner";
import ErrorComponent from "../../utils/reactQuery/ErrorComponent";

const fetchItems = async (): Promise<dogMoreInformation[]> => {
    const response = await fetch('/mock/dog_more_information.json');
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};

const ItemList = () => {
    const {data, error, isLoading} = useQuery<dogMoreInformation[], Error>('dogMoreInformation', fetchItems);

    const getImageUrl = (imageUrl: string) => {
        try {
            return require(`../../assets/img/product_image/${imageUrl}`);
        } catch (error) {
            console.error('Error loading image:', error);
            return '';
        }
    };

    if (isLoading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <ErrorComponent message={error.message}/>;
    }

    return (
        <div className={styles.container}>
            {data?.map((item) => (
                <Item
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    discount={item.discount}
                    recommended={item.recommended}
                    reviewCount={item.reviewCount}
                    imageUrl={getImageUrl(item.imageUrl)}
                />
            ))}
        </div>
    );
};

export default ItemList;
