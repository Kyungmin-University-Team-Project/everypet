import React, { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { FaStar, FaRegStar, FaAngleRight, FaBolt } from 'react-icons/fa';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { FcHome } from 'react-icons/fc';
import { TbTruckDelivery } from 'react-icons/tb';
import styles from './moreInformation.module.css';
import Review from "./review";
import ProductInquiry from "./ProductInquiry";
import SellerInformation from "./SellerInformation";
import { addToCart } from "../../utils/product/cart";
import { fetchProductDetails, ProductDetails } from "../../typings/fetchProductDetails";

const MoreInformation: React.FC = () => {
    const location = useLocation();
    const item = location.state?.item;
    const [quantity, setQuantity] = useState<number>(1);
    const [discountedPrice, setDiscountedPrice] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [productDetails, setProductDetails] = useState<ProductDetails | null>(null);

    const informationRef = useRef<HTMLDivElement>(null);
    const purchaseInfoRef = useRef<HTMLDivElement>(null);
    const reviewsRef = useRef<HTMLDivElement>(null);
    const productInquiryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (item) {
            (async () => {
                console.log("Fetching details for product ID:", item.productId);
                try {
                    const details = await fetchProductDetails(item.productId);
                    setProductDetails(details);
                } catch (error) {
                    console.error("Failed to fetch product details:", error);
                }
            })();
        }
    }, [item]);

    useEffect(() => {
        if (productDetails) {
            const originalPrice = parseFloat(productDetails.productPrice.toString().replace(/,/g, ''));
            const calculatedDiscountedPrice = originalPrice - originalPrice * (productDetails.productDiscountRate / 100);
            setDiscountedPrice(Math.floor(calculatedDiscountedPrice));
        }
    }, [productDetails]);

    useEffect(() => {
        setTotalPrice(discountedPrice * quantity);
    }, [discountedPrice, quantity]);

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) =>
            i < rating ? <FaStar className={styles.star} key={i} /> : <FaRegStar key={i} />
        );
    };

    const handleIncrement = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
        ref.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAddToCart = () => {
        if (item) {
            addToCart(item.productId, quantity);
        }
    };

    if (!item) {
        return <div>상품 정보를 불러오는 중입니다...</div>;
    }

    const formattedImageUrl = `https://storage.googleapis.com/every_pet_img/${item.productId}-description`;

    return (
        <div>
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
                            <h2>{productDetails?.productName}</h2>
                            <div className={styles.reviews}>
                                {renderStars(item.recommended)}
                                <span className={styles.review_count}>
                                    <strong>{productDetails?.productViews}</strong> 리뷰 보기
                                </span>
                                <FaAngleRight className={styles.icon} />
                            </div>
                            <p className={styles.price_original}>{productDetails?.productPrice}원</p>
                            <p className={styles.dynamic_price}>
                                <strong className={styles.discount_info}>{productDetails?.productDiscountRate}%</strong>
                                <span className={styles.discount_percentage}>{totalPrice.toLocaleString()}</span>
                                <span className={styles.discount_info_one}>원</span>
                            </p>
                            <p>
                                <strong>적립혜택</strong>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;최대 <strong className={styles.score_text}>2,270점 +
                                2p</strong> 적립
                            </p>
                            <p>
                                <strong>배송정보</strong>
                                <IoIosInformationCircleOutline className={styles.icon} />
                                &nbsp;배송비 3,000원(30,000원 이상 무료배송)
                                <br />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;제주도/도서산간 추가배송비 별도
                            </p>
                            <div className={styles.delivery_options}>
                                <p className={styles.delivery}>
                                    <span>
                                        <FcHome />
                                        {' '}<strong className={styles.delivery_options_text}>가장 빠른배송</strong>을 확인하세요!
                                    </span>
                                </p>
                                <p>
                                    <FaBolt className={styles.fabolt} />
                                    {' '}당일배송: 오늘(3/13) 밤 12시 도착
                                </p>
                                <p>
                                    {' '}새벽배송: 내일(3/14) 새벽 7시 이전 도착
                                </p>
                                <p>
                                    <TbTruckDelivery />
                                    {' '}GS전달배송: 다음날 도착예정
                                </p>
                            </div>
                            <div className={styles.purchase_options}>
                                <div className={styles.quantity_control}>
                                    <button className={styles.decrement} onClick={handleDecrement}>-</button>
                                    <input type="text" value={quantity} readOnly className={styles.quantity_input} />
                                    <button className={styles.increment} onClick={handleIncrement}>+</button>
                                </div>
                                <button className={styles.cart_button} onClick={handleAddToCart}>장바구니</button>
                                <button className={styles.purchase_button}>구매하기</button>
                            </div>
                        </div>
                    </div>
                </article>
                <article className={styles.information}>
                    <div className={styles.information_box}>
                        <button className={styles.tab_btn} onClick={() => scrollToSection(informationRef)}>상세정보</button>
                        <button className={styles.tab_btn} onClick={() => scrollToSection(purchaseInfoRef)}>리뷰</button>
                        <button className={styles.tab_btn} onClick={() => scrollToSection(reviewsRef)}>상품문의</button>
                        <button className={styles.tab_btn} onClick={() => scrollToSection(productInquiryRef)}>배송 정보</button>
                    </div>
                    <div ref={informationRef}>
                        <img className={styles.moreInformation_imgTab} src={formattedImageUrl} alt={productDetails?.productName} />
                    </div>
                    <div ref={purchaseInfoRef}>
                        <Review />
                    </div>
                    <div ref={reviewsRef}>
                        <ProductInquiry />
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
