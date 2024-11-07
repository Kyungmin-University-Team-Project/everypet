import * as PortOne from "@portone/browser-sdk/v2";
import axios from "axios";
import {decryptToken} from "../auth/token";
import axiosInstance from "../error/axiosInstance";

interface Product {
    productId: string;
    quantity: number;
}

export const handleKaKaoPaymentRequest = async (
    orderName: string,
    totalAmount: number,
    orderId: string,
) => {
    const response = await PortOne.requestPayment({
        storeId: "store-9fb2e733-efb3-44e1-98c7-7e017b9c43b4",
        channelKey: "channel-key-21a980f2-c8cb-4299-84d4-844ca8cd772d",
        paymentId: crypto.randomUUID(),
        orderName: orderName,
        totalAmount: totalAmount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        isTestChannel: true,
        customer: {
            email: "customer@example.com",
            phoneNumber: '010-6662-8752',
            fullName: '박민규'
        }
    });

    if (response?.paymentId) {
        try {
            const token = decryptToken();

            await axiosInstance.post('/payment/complete', {
                orderId: orderId,
                paymentId: response.paymentId,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "access": token
                }
            });

        } catch (error) {
            console.error('결제 정보 전송 중 오류 발생:', error);
        }
    } else {
        alert('결제 요청에 실패했습니다.');
    }
};

// 토스 결제
// 우선 미사용
export const handleTossPaymentRequest = async (
    orderName: string,
    totalAmount: number,
    orderId: string,
    addressId: string,
    products: Product[]
) => {
    const response = await PortOne.requestPayment({
        isTestChannel: true,
        storeId: "store-9fb2e733-efb3-44e1-98c7-7e017b9c43b4",
        paymentId: `payment-${crypto.randomUUID().replace(/[{}]/g, "")}`,
        orderName: orderName,
        totalAmount: totalAmount,
        currency: "CURRENCY_KRW",
        channelKey: "channel-key-f062cfc3-6c3e-4436-839d-c8d6b6bfe482",
        payMethod: "EASY_PAY",
    });

    if (response?.paymentId) {
        try {
            const token = decryptToken();
            const notified = await axios.post('http://localhost:8080/payment/complete', {
                paymentId: response.paymentId,
                orderId: orderId,
                addressId: addressId,
                products: products
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "access": token
                }
            });

            if (notified.status === 200) {
                alert('결제가 성공적으로 완료되었습니다.');
            } else {
                alert('결제 정보 전송에 실패했습니다.');
            }
        } catch (error) {
            console.error('결제 정보 전송 중 오류 발생:', error);
            alert('결제 정보 전송에 실패했습니다.');
        }
    } else {
        alert('결제 요청에 실패했습니다.');
    }
};
