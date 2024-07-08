import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ProductcategoryItem from './ProductcategoryItem';
import styles from './Productcategory.module.css';
import {setClickedCategory} from '../../redux/features/categorySlice';
import {RootState} from '../../redux/store/rootReducer';
import Categorymodal from './Categorymodal';
import useToggle from '../../utils/common/ToggleUtil';
import Categorybarbtn from './Categorybarbtn';
import Realtimekeyword from '../Header/Realtimekeyword';

const categories = [
    {name: '쿠폰/기획전', link: '/coupon'},
    {name: '타임딜', link: '/timesale'},
    {name: '강아지', link: '/dog'},
    {name: '고양이', link: '/cat'},
    {name: '설치류', link: '/rat'},
    {name: '조류', link: '/bird'},
    {name: '파충류', link: '/reptiles'},
];

const Productcategory = () => {
    const dispatch = useDispatch();
    const clickedCategory = useSelector(
        (state: RootState) => state.category.clickedCategory
    );
    const [isOpen, toggleOn, toggleOff] = useToggle(false);
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

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
        <div>
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
                        {categories.map((category, index) => (
                            <ProductcategoryItem
                                key={index}
                                category={category.name}
                                isActive={clickedCategory === category.name}
                                onClick={handleClick}
                                link={category.link}
                            />
                        ))}
                    </ul>
                    {!isMobile && <Realtimekeyword/>}
                </div>
            </nav>
            <Categorymodal isOpen={isOpen} setOpen={toggleOn} setClose={toggleOff}/>
        </div>
    );
};

export default Productcategory;
