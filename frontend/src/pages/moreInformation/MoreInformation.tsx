import React from 'react';
import Header from "../../layout/Header/Header";
import Fixedheader from "../../layout/Header/Fixedheader";
import Productcategory from "../../layout/category/Productcategory";
import {useLocation} from "react-router-dom";
import {FaStar, FaRegStar} from "react-icons/fa";
import styles from "./moreInformation.module.css";
import { FaAngleRight } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

const MoreInformation = () => {
    const location = useLocation();
    const {item} = location.state;

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? <FaStar className={styles.star} key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    // 할인 가격 계산
    const calculateDiscountedPrice = (price: string, discount: number): number => {
        const originalPrice = parseFloat(price.replace(/,/g, ''));
        const discountedPrice  = originalPrice - (originalPrice * (discount / 100));
        return Math.floor(discountedPrice);
    };

    const discountedPrice: number = calculateDiscountedPrice(item.price, item.discount);
    return (
        <div>
            <Fixedheader/>
            <Header/>
            <Productcategory/>
            <section className={styles.section_box}>
                <article className={styles.article_moreInformation}>
                    <div className={styles.box_moreInformation}>
                        <img src={item.imageUrl} className={styles.moreInformation_img} alt={item.name}/>
                        <div>
                            <div>
                                <span className={styles.headingText}>강아지</span>
                                <strong>
                                    놀자멍뭉
                                </strong>
                                <FaAngleRight className={styles.icon}/>
                            </div>
                            <h2>{item.name}</h2>
                            <p>
                                <div>
                                    {renderStars(item.recommended)}
                                    <span style={{marginLeft: '10px'}}>
                                        <strong>
                                            19,999
                                        </strong>
                                    </span> 리뷰 보기
                                    <FaAngleRight className={styles.icon}/>
                                </div>
                            </p>

                            <p className={styles.price}>{item.price}원</p>
                            <p>
                                <strong className={styles.sealText}>
                                    {item.discount}%{' '}
                                </strong>
                                <span className={styles.sealText_price}>
                                    {discountedPrice.toLocaleString()}
                                </span>
                                <span className={styles.sealText_priceOne}>
                                    원
                                </span>
                            </p>

                            <p>
                                <strong>
                                    적립혜택
                                </strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                최대
                                <strong className={styles.score_text}>
                                    {' '}
                                    2,270점 + 2p
                                </strong>
                                {' '}
                                 적립
                            </p>
                            <p>
                                <strong>
                                    배송정보
                                </strong>
                                <IoIosInformationCircleOutline className={styles.icon}/>
                                &nbsp;
                                배송비 3,000원(30,000원 이상 무료배송)
                                <br/>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;
                                제주도/도서산간 추가배송비 별도
                            </p>
                        </div>
                    </div>
                </article>
            </section>
        </div>
    );
};

export default MoreInformation;