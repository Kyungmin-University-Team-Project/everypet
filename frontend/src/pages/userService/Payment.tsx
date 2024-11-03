import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Payment.module.css';
import { handleKaKaoPaymentRequest } from "../../utils/product/payment";
import axiosInstance from "../../utils/error/axiosInstance";
import { CartItem } from "../../typings/product";
import { formatPrice } from "../../utils/product/product";

const shippingFee = 3000;

const Payment: React.FC = () => {
    const location = useLocation();
    const { selectedProducts, totalPrice } = location.state || { selectedProducts: [], totalPrice: 0 };

    console.log(selectedProducts)

    const [orderInfo, setOrderInfo] = useState({
        recipient: '',
        postalCode: '',
        address: '',
        detailedAddress: '',
        phonePrefix: '010',
        phoneNumber1: '',
        phoneNumber2: '',
        safeNumber: false,
        request: '',
    });

    const handleOrderInfoChange = (field: string, value: string | boolean) => {
        setOrderInfo(prevState => ({
            ...prevState,
            [field]: value,
        }));
    };

    const handlePayment = async () => {
        const orderId = crypto.randomUUID();
        const addressId = '1';

        // 주문 정보를 서버에 전송하기 위한 DTO 구성
        const orderInsertDTO = {
            orderId: orderId,
            addressId: addressId,
            products: selectedProducts.map((item: CartItem) => ({
                productId: item.productId,
                quantity: item.cartQuantity
            })),
            delivery: shippingFee,
            postalCode: orderInfo.postalCode,
            address: orderInfo.address,
            addressDetail: orderInfo.detailedAddress,
            receiver: orderInfo.recipient,
            phone: `${orderInfo.phonePrefix}${orderInfo.phoneNumber1}${orderInfo.phoneNumber2}`,
            request: orderInfo.request
        };

        try {
            console.log(orderInsertDTO);

            // 주문 정보를 서버로 전송
            const orderResponse = await axiosInstance.post('/order/insert', orderInsertDTO, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (orderResponse.status === 200) {
                console.log('주문 정보가 성공적으로 전송되었습니다.');

                // 카카오페이 결제 요청
                await handleKaKaoPaymentRequest(
                    selectedProducts.length > 1
                        ? `${selectedProducts[0].productName} 외 ${selectedProducts.length - 1}건`
                        : selectedProducts[0]?.productName || '주문상품',
                    totalPrice,
                    orderId,
                );
            } else {
                alert('주문 정보 전송에 실패했습니다.');
            }
        } catch (error) {
            console.error('주문 정보 전송 중 오류 발생:', error);
            alert('주문 정보 전송에 실패했습니다.');
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.inner}>
                    <Link to='/' className={styles.logo}>
                        에브리펫
                    </Link>
                </div>
            </header>
            <div className={styles.section}>
                <div className={styles.paymentItems}>
                    <div className={styles.paymentHeader}>
                        <h2>주문 결제</h2>
                    </div>
                    <section className={styles.orderInfo}>
                        <div className={styles.orderHeader}>
                            <h2 className={styles.orderTitle}>배송정보</h2>
                            <button className={styles.orderSearch__btn}>배송지목록</button>
                        </div>
                        <div className={styles.inputForm}>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="받는사람"
                                    className={styles.inputField}
                                    value={orderInfo.recipient}
                                    onChange={(e) => handleOrderInfoChange('recipient', e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup__address}>
                                <button className={styles.addressSearch__btn}>주소찾기</button>
                                <input
                                    type="text"
                                    placeholder="우편번호"
                                    className={styles.inputField}
                                    value={orderInfo.postalCode}
                                    onChange={(e) => handleOrderInfoChange('postalCode', e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="기본 주소"
                                    className={styles.inputField}
                                    value={orderInfo.address}
                                    onChange={(e) => handleOrderInfoChange('address', e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <input
                                    type="text"
                                    placeholder="상세 주소 및 상세 건물명"
                                    className={styles.inputField}
                                    value={orderInfo.detailedAddress}
                                    onChange={(e) => handleOrderInfoChange('detailedAddress', e.target.value)}
                                />
                            </div>
                            <div className={styles.inputGroup__phone}>
                                <select
                                    className={styles.phoneSelect}
                                    value={orderInfo.phonePrefix}
                                    onChange={(e) => handleOrderInfoChange('phonePrefix', e.target.value)}
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                </select>
                                <input
                                    type="text"
                                    maxLength={4}
                                    placeholder="휴대폰 앞자리"
                                    className={styles.phoneInput}
                                    value={orderInfo.phoneNumber1}
                                    onChange={(e) => handleOrderInfoChange('phoneNumber1', e.target.value)}
                                />
                                <input
                                    type="text"
                                    maxLength={4}
                                    placeholder="휴대폰 뒷자리"
                                    className={styles.phoneInput}
                                    value={orderInfo.phoneNumber2}
                                    onChange={(e) => handleOrderInfoChange('phoneNumber2', e.target.value)}
                                />
                            </div>
                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="safeNumber"
                                    className={styles.checkbox}
                                    checked={orderInfo.safeNumber}
                                    onChange={(e) => handleOrderInfoChange('safeNumber', e.target.checked)}
                                />
                                <label htmlFor="safeNumber">안심번호 사용</label>
                            </div>
                            <div className={styles.inputGroup__request}>
                                <div className={styles.requestTitle}>요청사항</div>
                                <select
                                    id="request"
                                    className={styles.requestSelect}
                                    value={orderInfo.request}
                                    onChange={(e) => handleOrderInfoChange('request', e.target.value)}
                                >
                                    <option value="default">배송시 요청사항 선택하기</option>
                                    <option value="door">문 앞에 놔주세요</option>
                                    <option value="guard">경비실에 맡겨주세요</option>
                                    <option value="phone">배송 전 휴대폰으로 연락주세요</option>
                                    <option value="handle_with_care">파손위험이 있는 상품이니 조심히 다뤄주세요</option>
                                    <option value="direct">직접 입력</option>
                                </select>
                            </div>
                        </div>
                    </section>
                    <section className={styles.productInfo}>
                        <div className={styles.productListHeader}>
                            <h2 className={styles.productTitle}>
                                주문상품
                            </h2>
                            <span className={styles.orderSubTitle}>
                                상품수량 및 옵션변경은 상품상세 또는 장바구니에서 가능합니다.
                            </span>
                        </div>
                        {selectedProducts.map((item: CartItem) => (
                            <div className={styles.item__wrap} key={item.cartId}>
                                <div className={styles.item}>
                                    <div className={styles.itemLeft}>
                                        <img
                                            src={item.productImg}
                                            alt={item.productName}
                                            className={styles.productImage}
                                        />
                                    </div>
                                    <div className={styles.product}>
                                        <div className={styles.productDetails}>
                                            <p>{item.productName}</p>
                                        </div>
                                        <div className={styles.quantity}>
                                            <p>{item.cartQuantity}개</p>
                                        </div>
                                        <div className={styles.total}>
                                            <p className={styles.price}>
                                                {item.productDiscountRate
                                                    ? formatPrice(Math.round((item.productPrice * item.cartQuantity) * (1 - item.productDiscountRate / 100)))
                                                    : formatPrice(item.productPrice * item.cartQuantity)
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
                <div className={styles.summaryContainer}>
                    <div className={styles.summary}>
                        <div className={styles.shippingFee}>
                            <span>배송비:</span>
                            <span>{formatPrice(shippingFee)}</span>
                        </div>
                        <div className={styles.summaryTotal}>
                        <span>합계:</span>
                            <span>{formatPrice(totalPrice)}</span>
                        </div>
                        <button
                            className={styles.checkoutButton}
                            onClick={handlePayment}
                        >결제하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
