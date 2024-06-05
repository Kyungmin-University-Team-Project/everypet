import React, {useEffect, useState} from 'react';
import {SidebarProps} from '../../typings/layout';
import styles from './Categorymodal.module.css';
import {Link} from 'react-router-dom';

const categories = [
    {
        name: '강아지',
        link: '/dog',
        subCategories: [
            '강아지 사료',
            '강아지 장난감',
            '강아지 집',
            '강아지 목줄 및 목걸이',
            '강아지 의류',
            '강아지 미용',
            '강아지 건강',
        ],
    },
    {
        name: '고양이',
        link: '/cat',
        subCategories: [
            '고양이 사료',
            '고양이 장난감',
            '고양이 집',
            '고양이 옷',
            '고양이 미용',
            '고양이 건강',
            '고양이 화장실',
            '고양이 나무와 가구',
            '캣잎',
        ],
    },
    {
        name: '설치류',
        link: '/rat',
        subCategories: [
            '설치류 먹이',
            '설치류 장난감',
            '설치류 집',
            '설치류 옷',
            '설치류 미용',

        ],
    },
    {
        name: '조류',
        link: '/bird',
        subCategories: [
            '새 먹이',
            '새 장난감',
            '새 집',
            '새 미용',
            '새 건강',
            '새 케이지'],
    },
    {
        name: '파충류',
        link: '/reptiles',
        subCategories: [
            '파충류 먹이',
            '파충류 장난감',
            '파충류 미용',
            '파충류 건강',
            '파충류 케이지',
            '파충류 히터 및 조명',
        ],
    },
];

const Categorymodal = ({isOpen, setOpen, setClose}: SidebarProps) => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // 마우스가 모달 영역을 벗어날 때 모달 열림 상태를 false로 설정
    const handleMouseLeave = () => {
        setClose();
    };

    return (
        <div
            className={isOpen ? styles.modal__open : styles.modal__close}
            onMouseLeave={handleMouseLeave} // 모달 영역을 벗어날 때 호출
        >
            <div
                className={scrollY >= 200 ? styles.modal__fixed : styles.modal__content}
            >
                {isOpen && (
                    <div className={styles.categories__container}>
                        {categories.map((category, index) => (
                            <div key={index} className={styles.category}>
                                <div className={styles.category__content}>
                                    <Link to={category.link} className={styles.category__link}>
                    <span className={styles.category__title}>
                      {category.name}
                    </span>
                                    </Link>

                                    <div className={styles.ul__wrap}>
                                        <div className={styles.ul__line__bg}></div>
                                        <div className={styles.ul__line}></div>
                                        <ul>
                                            {category.subCategories.map((subCategory, subIndex) => (
                                                <li key={subIndex}>{subCategory}</li>
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

export default Categorymodal;
