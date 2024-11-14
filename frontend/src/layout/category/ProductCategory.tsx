import React, {useEffect, useState} from 'react';
import styles from './ProductCategory.module.css';

import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ProductcategoryItem from './ProductCategoryItem';
import {setClickedCategory} from '../../redux/features/categorySlice';
import {RootState} from '../../redux/store/rootReducer';
import Categorymodal from './CategoryModal';
import useToggle from '../../utils/common/ToggleUtil';
import Categorybarbtn from './Categorybarbtn';
import RealtimeKeyword from '../Header/RealtimeKeyword';
import useResizeMobile from "../../hooks/useResizeMobile";

const categories = [
    {name: '기획전', link: '/exhibitions', tag: 'exhibitions'},
    {name: '타임딜', link: '/timeDeal', tag: 'timeDeal'},
    {name: '강아지', link: '/dog', tag: 'dog'},
    {name: '고양이', link: '/cat', tag: 'cat'},
    {name: '설치류', link: '/rat', tag: 'rat'},
    {name: '조류', link: '/bird', tag: 'bird'},
    {name: '파충류', link: '/reptiles', tag: 'reptiles'},
];

const ProductCategory = () => {
    const dispatch = useDispatch();
    const clickedCategory = useSelector(
        (state: RootState) => state.category.clickedCategory
    );

    const [isOpen, toggleOn, toggleOff] = useToggle(false);
    const location = useLocation();
    const isMobile = useResizeMobile();


    useEffect(() => {
        const handleScroll = () => {
            if (isOpen) {
                toggleOff(); // 스크롤 시 모달이 열려있으면 닫기
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen, toggleOff]);

    useEffect(() => {
        const categoryLinks = categories.map(category => category.link);
        if (!categoryLinks.includes(location.pathname)) {
            dispatch(setClickedCategory(''));
            window.scroll(0, 0);
        }
    }, [location.pathname, dispatch]);

    const handleClick = (category: string) => {
        if (clickedCategory === category) {
            return;
        } else {
            console.log(category)
            dispatch(setClickedCategory(category));
        }
    };

    return (
        <>
            <nav className={styles.container}>
                <div className={styles.inner}>
                    {!isMobile && (
                        <Categorybarbtn
                            isOpen={isOpen}
                            setOpen={toggleOn}
                            setClose={toggleOff}
                        />
                    )}
                    <ul className={styles.category__menu}>
                        {categories.map((category) => (
                            <ProductcategoryItem
                                key={category.name}
                                category={category.name}
                                isActive={clickedCategory === category.name}
                                onClick={handleClick}
                                link={category.link}
                                tag={category.tag}
                            />
                        ))}
                    </ul>
                    {!isMobile && <RealtimeKeyword/>}
                </div>
            </nav>
            <Categorymodal isOpen={isOpen} setOpen={toggleOn} setClose={toggleOff}/>
        </>
    );
};

export default ProductCategory;
