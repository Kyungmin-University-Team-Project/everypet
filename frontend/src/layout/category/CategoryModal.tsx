import React, {useEffect, useState} from 'react';
import {MegaMenuProps} from '../../typings/layout';
import styles from './Categorymodal.module.css';
import {useLocation, useNavigate} from 'react-router-dom';

const categories = [
    {
        name: '강아지',
        link: '/dog',
        subCategories: [
            {name: '강아지 사료', link: '/dog/feed'},
            {name: '강아지 장난감', link: '/dog/toy'},
            {name: '강아지 집', link: '/dog/house'},
            {name: '강아지 목줄', link: '/dog/leash'},
            {name: '강아지 의류', link: '/dog/clothes'},
            {name: '강아지 간식', link: '/dog/snack'},
            {name: '강아지 미용', link: '/dog/beauty'},
            {name: '강아지 건강', link: '/dog/health'},
            {name: '강아지 화장실', link: '/dog/restroom'},
        ],
    },
    {
        name: '고양이',
        link: '/cat',
        subCategories: [
            {name: '고양이 사료', link: '/cat/feed'},
            {name: '고양이 장난감', link: '/cat/toy'},
            {name: '고양이 집', link: '/cat/house'},
            {name: '고양이 옷', link: '/cat/clothes'},
            {name: '고양이 미용', link: '/cat/beauty'},
            {name: '고양이 건강', link: '/cat/health'},
            {name: '고양이 화장실', link: '/cat/restroom'},
        ],
    },
    {
        name: '설치류',
        link: '/rat',
        subCategories: [
            {name: '설치류 먹이', link: '/rat/feed'},
            {name: '설치류 장난감', link: '/rat/toy'},
            {name: '설치류 집', link: '/rat/house'},
            {name: '설치류 옷', link: '/rat/clothes'},
            {name: '설치류 미용', link: '/rat/beauty'},
            {name: '설치류 간식', link: '/rat/snack'},
        ],
    },
    {
        name: '조류',
        link: '/bird',
        subCategories: [
            {name: '새 먹이', link: '/bird/feed'},
            {name: '새 장난감', link: '/bird/toy'},
            {name: '새 집', link: '/bird/house'},
            {name: '새 미용', link: '/bird/beauty'},
            {name: '새 건강', link: '/bird/health'},
            {name: '새 간식', link: '/bird/snack'},
        ],
    },
    {
        name: '파충류',
        link: '/reptiles',
        subCategories: [
            {name: '파충류 먹이', link: '/reptiles/feed'},
            {name: '파충류 장난감', link: '/reptiles/toy'},
            {name: '파충류 건강', link: '/reptiles/health'},
            {name: '파충류 집', link: '/reptiles/house'},
            {name: '파충류 히터', link: '/reptiles/heater'},
            {name: '파충류 간식', link: '/reptiles/snack'},
        ],
    },
];

const CategoryModal = ({isOpen, setClose}: MegaMenuProps) => {
    const [scrollY, setScrollY] = useState(0);
    const navigate = useNavigate();
    const location = useLocation()
    const [activeCategory, setActiveCategory] = useState(''); // 활성화된 카테고리를 추적
    const [activeSubCategory, setActiveSubCategory] = useState(''); // 활성화된 서브카테고리를 추적

    // 거의 변하지 않는 카테고리 데이터를 상수로 정의

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트
        };

        window.addEventListener('scroll', handleScroll);


        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [location]);

    // URL 파라미터를 기반으로 활성화된 카테고리 및 서브카테고리 설정
    useEffect(() => {
        const currentPath = location.pathname; // 현재 URL 경로
        const matchingCategory = categories.find((category) =>
            currentPath.startsWith(category.link)
        );

        if (matchingCategory) {
            setActiveCategory(matchingCategory.link);
            // 서브카테고리가 일치하는 경우 설정
            const matchingSubCategory = matchingCategory.subCategories.find((subCategory) =>
                currentPath.startsWith(subCategory.link)
            );
            if (matchingSubCategory) {
                setActiveSubCategory(matchingSubCategory.link);
            } else {
                setActiveSubCategory(''); // 서브카테고리가 일치하지 않는 경우 초기화
            }
        }else{
            // 홈으로 돌아면 액티브 초기화
            setActiveCategory('')
            setActiveSubCategory('')
        }
    }, [location, categories]);

    const handleMouseLeave = () => {
        setClose();
    };

    const handleCategoryClick = (link: string) => {
        navigate(link);
        setClose(); // 카테고리를 클릭하면 모달을 닫음
    };

    return (
        <div
            className={isOpen ? styles.modal__open : styles.modal__close}
            onMouseLeave={handleMouseLeave}
        >
            <div className={styles.modal__content}>
                {isOpen && (
                    <div className={styles.categories__container}>
                        {categories.map((category) => (
                            <div key={category.name} className={styles.category}>
                                <div
                                    className={`${styles.category__content} ${
                                        activeCategory === category.link ? styles.active : ''
                                    }`}
                                    onClick={() => handleCategoryClick(category.link)}
                                >
                                    <span className={styles.category__title}>{category.name}</span>

                                    <div className={styles.ul__wrap}>
                                        <div className={styles.ul__line__bg}></div>
                                        <div className={styles.ul__line}></div>
                                        <ul>
                                            {category.subCategories.map((subCategory) => (
                                                <li
                                                    key={subCategory.name}
                                                    className={
                                                        activeSubCategory === subCategory.link
                                                            ? styles.active
                                                            : ''
                                                    }
                                                    onClick={(e) => {
                                                        e.stopPropagation(); // 이벤트 버블링 방지
                                                        handleCategoryClick(subCategory.link);
                                                    }} // 클릭 시 해당 링크로 이동
                                                >
                                                    {subCategory.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryModal;
