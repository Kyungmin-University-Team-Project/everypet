import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import styles from './Quicknav.module.css';
import {setClickedCategory} from '../../../redux/features/categorySlice';

interface Category {
    name: string;
    image: string;
    link: string;
}

const categories: Category[] = [
    {name: '기획전', image: '/img/quicknav/Exhibitions.webp', link: '/exhibitions'},
    {name: '타임딜', image: '/img/quicknav/imminent.gif', link: '/timeDeal'},
    {name: '강아지', image: '/img/quicknav/dog.webp', link: '/dog'},
    {name: '고양이', image: '/img/quicknav/cat.webp', link: '/cat'},
    {name: '설치류', image: '/img/quicknav/hamster.webp', link: '/rat'},
    {name: '조류', image: '/img/quicknav/bird.webp', link: '/bird'},
    {name: '파충류', image: '/img/quicknav/retail.webp', link: '/reptiles'},
];
const Quicknav: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (category: Category) => {
        dispatch(setClickedCategory(category.name));
        navigate(category.link);
    };

    return (
        <div className={styles.quick__nav__container}>
            <nav className={styles.quick__nav}>
                {categories.map((category) => (
                    <div
                        key={category.name}
                        className={styles.quick__nav__item}
                        onClick={() => handleClick(category)}
                    >
                        <div className={styles.img__container}>
                            <img
                                className={styles.img}
                                src={category.image}
                                alt={category.name}
                            />
                        </div>
                        <span>{category.name}</span>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default Quicknav;
