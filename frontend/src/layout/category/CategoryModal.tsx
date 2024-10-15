import React, { useEffect, useState } from 'react';
import { MegaMenuProps } from '../../typings/layout';
import { DetailedCategoryList } from '../../typings/product';
import styles from './Categorymodal.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchCategoryDetails } from "../../utils/product/category";

const CategoryModal = ({ isOpen, setClose }: MegaMenuProps) => {
    const [scrollY, setScrollY] = useState(0);
    const [categories, setCategories] = useState<{ name: string, link: string, subCategories: { name: string, link: string }[] }[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        // 카테고리 데이터를 비동기로 불러오기
        const loadCategories = async () => {
            try {
                const dogData = await fetchCategoryDetails('dog');
                const catData = await fetchCategoryDetails('cat');
                const ratData = await fetchCategoryDetails('rat');
                const birdData = await fetchCategoryDetails('bird');
                const reptilesData = await fetchCategoryDetails('reptiles');

                // 필요한 카테고리 데이터를 적절히 구조화
                const fetchedCategories = [
                    {
                        name: '강아지',
                        link: '/dog',
                        subCategories: dogData.detailedCategories.map((item: DetailedCategoryList) => ({
                            name: item.name,
                            link: item.link,
                        })),
                    },
                    {
                        name: '고양이',
                        link: '/cat',
                        subCategories: catData.detailedCategories.map((item: DetailedCategoryList) => ({
                            name: item.name,
                            link: item.link,
                        })),
                    },
                    {
                        name: '설치류',
                        link: '/rat',
                        subCategories: ratData.detailedCategories.map((item: DetailedCategoryList) => ({
                            name: item.name,
                            link: item.link,
                        })),
                    },
                    {
                        name: '조류',
                        link: '/bird',
                        subCategories: birdData.detailedCategories.map((item: DetailedCategoryList) => ({
                            name: item.name,
                            link: item.link,
                        })),
                    },
                    {
                        name: '파충류',
                        link: '/reptiles',
                        subCategories: reptilesData.detailedCategories.map((item: DetailedCategoryList) => ({
                            name: item.name,
                            link: item.link,
                        })),
                    },
                ];

                setCategories(fetchedCategories);
            } catch (error) {
                console.error('Failed to load category details:', error);
            }
        };

        if (isOpen) {
            loadCategories(); // 모달이 열렸을 때 카테고리 데이터를 불러옴
        }
    }, [isOpen]);

    const handleMouseLeave = () => {
        setClose();
    };

    const handleCategoryClick = (link: string) => {
        console.log(link);
        navigate(link);
        setClose(); // 카테고리를 클릭하면 모달을 닫음
    };

    return (
        <div
            className={isOpen ? styles.modal__open : styles.modal__close}
            onMouseLeave={handleMouseLeave} // 모달 영역을 벗어날 때 호출
        >
            <div className={scrollY >= 200 ? styles.modal__fixed : styles.modal__content}>
                {isOpen && (
                    <div className={styles.categories__container}>
                        {categories.map((category) => (
                            <div key={category.name} className={styles.category}>
                                <div
                                    className={styles.category__content}
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
