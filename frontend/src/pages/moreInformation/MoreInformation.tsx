import React, { useEffect, useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './moreInformation.module.css';
import Review from "./review";
import ProductInquiry from "./ProductInquiry";
import SellerInformation from "./SellerInformation";
import axios from "axios";
import { addToCart } from "../../utils/product/cart";
import { FaAngleRight, FaStar, FaRegStar } from "../../icons/Icons";
import { API_URL } from "../../api/api";

interface Product {
    memberId: string;
    name: string;
    numberOfProduct: number;
    productDescriptionImg: string;
    productDiscountRate: number;
    productId: string;
    productImg: string;
    productMainCategory: string;
    productName: string;
    productPrice: number;
    productRatingAvg: number;
    productRegistrationDate: string;
    productSalesStatusYN: string;
    productSubCategory: string;
    productViews: number;
    reviewCount: number;
    salesCount: number;
}

const MoreInformation = () => {
    const location = useLocation();
    const productData = location.state;
    const [productList, setProductList] = useState<Product | null>(null);
    const [number, setNumberOfProduct] = useState<number>(1);
    const [finalPrice, setFinalPrice] = useState<number>(0);
    const [originalPrice, setOriginalPrice] = useState<number>(0);

    const informationRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const productInquiryRef = useRef<HTMLDivElement>(null);

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const productAsync = async () => {
            try {
                const response = await axios.get(`${API_URL}/product/${productData.item.productId}`);
                const data = response.data;
                setProductList(data);
            } catch (e) {
                console.log(e);
            }
        };

        console.log(productData);
        productAsync();
    }, []);

    const handlePlus = () => {
        setNumberOfProduct(prevState => prevState + 1);
        setFinalPrice(finalPrice + originalPrice);
    };

    const handleMinus = () => {
        if (number > 1) {
            setNumberOfProduct(prevState => prevState - 1);
            setFinalPrice(finalPrice - originalPrice);
        }
    };

    const handleOnClick = async () => {
        if (!productList?.productId) {
            return;
        }
        await addToCart(productList.productId, number);
    };

    const renderStars = () => {
        const recommended = productData.item.recommended || 0;
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                i < recommended
                    ? <FaStar className={styles.star} key={i} />
                    : <FaRegStar className={styles.star} key={i} />
            );
        }
        return stars;
    };

    useEffect(() => {
        if (productList) {
            const salePrice = () => {
                const originalPrice = productList?.productPrice ?? 0; // 원래 가격
                const discountRate = productList?.productDiscountRate ?? 0; // 할인율
                const discountAmount = (originalPrice * discountRate) / 100;
                const calculatedFinalPrice = originalPrice - discountAmount;

                setOriginalPrice(calculatedFinalPrice);
                setFinalPrice(parseInt(calculatedFinalPrice.toString()));
            };
            salePrice();
        }
    }, [productList]);

    return (
        <div>
            <section className={styles.section_box}>
                <article className={styles.article_moreInformation}>
                    <div className={styles.box_moreInformation}>
                        <img
                            loading="lazy"
                            src={productList?.productImg}
                            alt={productList?.name}
                            className={styles.moreInformation_img}
                        />
                        <div className={styles.info_container}>
                            <div>
                                <div className={styles.breadcrumb}>
                                    <span className={styles.headingText}>{productList?.productMainCategory}</span>
                                    <strong>{productList?.name}</strong>
                                    <FaAngleRight />
                                </div>
                                <div className={styles.reviews}>
                                    {/*<span onClick={() => scrollToSection(reviewsRef)} className={styles.review_count}>*/}
                                    {/*    리뷰 보기*/}
                                    {/*</span>*/}
                                    <div className={styles.stars}>{renderStars()} ({productList?.reviewCount})</div>
                                </div>
                            </div>
                            <div className={styles.price__wrap}>
                                <p className={styles.price_original}>{productList?.productPrice.toLocaleString()}원</p>
                                <p className={styles.dynamic_price}>
                                    <strong className={styles.discount_info}>{productList?.productDiscountRate}%</strong>
                                    <span className={styles.discount_info_one}>{finalPrice.toLocaleString()}원</span>
                                </p>
                            </div>
                            <div className={styles.product__info}>
                                <p>
                                    <strong>적립혜택:</strong>&nbsp;최대 <strong className={styles.score_text}>2,270점 + 2p</strong> 적립
                                </p>
                                <p>
                                    <strong>배송정보:</strong>&nbsp;배송비 3,000원(30,000원 이상 무료배송)
                                    <br />
                                    제주도/도서산간 추가배송비 별도
                                </p>
                            </div>
                            <div className={styles.purchase_options}>
                                <div className={styles.quantity_control}>
                                    <button className={styles.decrement} onClick={handleMinus}>-</button>
                                    <input
                                        type="text"
                                        readOnly
                                        className={styles.quantity_input}
                                        value={number}
                                    />
                                    <button className={styles.increment} onClick={handlePlus}>+</button>
                                </div>
                                <button onClick={handleOnClick} className={styles.cart_button}>장바구니</button>
                                <button onClick={handleOnClick} className={styles.purchase_button}>구매하기</button>
                            </div>
                        </div>
                    </div>
                </article>
                <article className={styles.information}>
                    <div className={styles.information_box}>
                        <button className={styles.tab_btn} onClick={() => scrollToSection(informationRef)}>상세정보</button>
                        {/*<button className={styles.tab_btn} onClick={() => scrollToSection(reviewsRef)}>리뷰</button>*/}
                        <button className={styles.tab_btn} onClick={() => scrollToSection(productInquiryRef)}>상품문의</button>
                        <button className={styles.tab_btn} onClick={() => scrollToSection(productInquiryRef)}>배송 정보</button>
                    </div>
                    <div ref={informationRef}>
                        <img
                            loading="lazy"
                            src={productList?.productDescriptionImg}
                            alt={productList?.productName}
                            className={styles.moreInformation_imgTab}
                        />
                    </div>
                    {/*<div ref={reviewsRef}>*/}
                    {/*    <Review />*/}
                    {/*</div>*/}
                    <div ref={reviewsRef}>
                        <ProductInquiry productId={productList?.productId ?? null} />
                    </div>
                    <div ref={productInquiryRef}>
                        <SellerInformation />
                    </div>
                    <Outlet />
                </article>
            </section>
        </div>
    );
};

export default MoreInformation;
