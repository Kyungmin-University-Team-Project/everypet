import * as PortOne from "@portone/browser-sdk/v2";
import axios from "axios";
import {decryptToken} from "../auth/token";
import axiosInstance from "../error/axiosInstance";
import {API_URL} from "../../api/api";

interface Product {
    productId: string;
    quantity: number;
}

export const handleKaKaoPaymentRequest = async (
    orderName: string,
    totalAmount: number,
    orderId: string,
) => {
    try {
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
                fullName: '박민규',
            },
        });

        if (response?.paymentId) {
            try {
                const paymentResponse = await axiosInstance.post(
                    `${API_URL}/payment/complete`,
                    {
                        orderId: orderId,
                        paymentId: response.paymentId,
                    }
                );

                if (paymentResponse.status === 200) {
                    return { status: 'success', paymentId: response.paymentId };
                } else {
                    console.error('결제 완료 처리 실패:', paymentResponse.data);
                    return { status: 'fail', message: '결제 완료 처리 실패' };
                }
            } catch (error) {
                console.error('결제 정보 전송 중 오류 발생:', error);
                return { status: 'fail', message: '결제 정보 전송 중 오류 발생' };
            }
        } else {
            console.warn('결제가 취소되었습니다.');
            return { status: 'cancel', message: '사용자가 결제를 취소했습니다.' };
        }
    } catch (error) {
        console.error('결제 요청 중 오류 발생:', error);
        return { status: 'fail', message: '결제 요청 중 오류 발생' };
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
            const notified = await axios.post(`${API_URL}/payment/complete`, {
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
