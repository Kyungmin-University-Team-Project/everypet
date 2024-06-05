import React, { useState, useEffect } from 'react';
import Header from "../../layout/Header/Header";
import Fixedheader from "../../layout/Header/Fixedheader";
import Productcategory from "../../layout/category/Productcategory";
import { useLocation } from "react-router-dom";
import { FaStar, FaRegStar, FaAngleRight } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import styles from "./moreInformation.module.css";
import { FcHome } from "react-icons/fc";
import { FaBolt } from "react-icons/fa";
import { IoMoon } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";
import TabInformationBtn from "../../components/moreInformation/TabInformationBtn";

const MoreInformation: React.FC = () => {
    const location = useLocation();
    const item = location.state?.item
    const [quantity, setQuantity] = useState<number>(1);
    const [discountedPrice, setDiscountedPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        if (item) {
            const originalPrice = parseFloat(item.price.replace(/,/g, ''));
            const calculatedDiscountedPrice = originalPrice - (originalPrice * (item.discount / 100));
            setDiscountedPrice(Math.floor(calculatedDiscountedPrice));
        }
    }, [item]);

    useEffect(() => {
        setTotalPrice(discountedPrice * quantity);
    }, [discountedPrice, quantity]);

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(i <= rating ? <FaStar className={styles.star} key={i} /> : <FaRegStar key={i} />);
        }
        return stars;
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <div>
            <Fixedheader />
            <Header />
            <Productcategory />
            <section className={styles.section_box}>
                <article className={styles.article_moreInformation}>
                    <div className={styles.box_moreInformation}>
                        <img src={item.imageUrl} className={styles.moreInformation_img} alt={item.name} />
                        <div className={styles.info_container}>
                            <div className={styles.breadcrumb}>
                                <span className={styles.headingText}>강아지</span>
                                <strong>놀자멍뭉</strong>
                                <FaAngleRight className={styles.icon} />
                            </div>
                            <h2>{item.name}</h2>
                            <div className={styles.reviews}>
                                {renderStars(item.recommended)}
                                <span className={styles.review_count}>
                                    <strong>20,586</strong> 리뷰 보기
                                </span>
                                <FaAngleRight className={styles.icon} />
                            </div>
                            <p className={styles.price_original}>{item.price}원</p>
                            <p className={styles.dynamic_price}>
                                <strong className={styles.discount_info}>
                                    {item.discount}%
                                </strong>
                                <span className={styles.discount_percentage}>
                                    {totalPrice.toLocaleString()}
                                </span>
                                <span className={styles.discount_info_one}>
                                    원
                                </span>
                            </p>
                            <p>
                                <strong>적립혜택</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                최대 <strong className={styles.score_text}>2,270점 + 2p</strong> 적립
                            </p>
                            <p>
                                <strong>배송정보</strong>
                                <IoIosInformationCircleOutline className={styles.icon} />
                                &nbsp;
                                배송비 3,000원(30,000원 이상 무료배송)
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;
                                제주도/도서산간 추가배송비 별도
                            </p>
                            <div className={styles.delivery_options}>
                                <p className={styles.delivery}>
                                    <span>
                                        <FcHome />
                                        {' '}
                                        <strong className={styles.delivery_options_text}>
                                            가장 빠른배송
                                        </strong>
                                        을 확인하세요!
                                    </span>
                                </p>
                                <p>
                                    <FaBolt className={styles.fabolt} />
                                    {' '}
                                    당일배송: 오늘(3/13) 밤 12시 도착
                                </p>
                                <p>
                                    <IoMoon className={styles.iomoon} />
                                    {' '}
                                    새벽배송: 내일(3/14) 새벽 7시 이전 도착
                                </p>
                                <p>
                                    <TbTruckDelivery />
                                    {' '}
                                    GS전달배송: 다음날 도착예정
                                </p>
                            </div>
                            <div className={styles.purchase_options}>
                                <div className={styles.quantity_control}>
                                    <button className={styles.decrement} onClick={handleDecrement}>-</button>
                                    <input type="text" value={quantity} readOnly className={styles.quantity_input} />
                                    <button className={styles.increment} onClick={handleIncrement}>+</button>
                                </div>
                                <button  className={styles.cart_button}>장바구니</button>
                                <button className={styles.purchase_button}>구매하기</button>
                            </div>
                        </div>
                    </div>
                </article>
                {/*상품정보, 리뷰 등 btn*/}
                <TabInformationBtn/>
            </section>
        </div>
    );
};

export default MoreInformation;
