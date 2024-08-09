import * as PortOne from "@portone/browser-sdk/v2";


// 카카오 결제
export const handleKaKaoPaymentRequest = async () => {
    const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-9fb2e733-efb3-44e1-98c7-7e017b9c43b4",
        // 채널 키 설정
        channelKey: "channel-key-21a980f2-c8cb-4299-84d4-844ca8cd772d",
        paymentId: `payment-${crypto.randomUUID().slice(0, 26)}`,
        orderName: "나이키 와플 트레이너 2 SD",
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY",
        isTestChannel: true,
        customer: {
            email: "customer@example.com",  // 필수 이메일 입력
            phoneNumber: '010-6662-8752',
            fullName: '박민규'
        }
    });

    if (response != null) {
        return alert(response.message);
    }

    // 서버 연결 파트는 우선 api 미완성

    // const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify({
    //         paymentId: response.paymentId,  // response에서 받은 paymentId
    //         // 추가적인 주문 정보 (예: 주문 ID, 결제 금액 등)
    //     }),
    // });
    //
    // if (notified.ok) {
    //     alert('결제가 성공적으로 완료되었습니다.');
    // } else {
    //     alert('결제 정보 전송에 실패했습니다.');
    // }
};

// 토스 결제
export const handleTossPaymentRequest = async () => {
    const response = await PortOne.requestPayment({
        isTestChannel: true,
        storeId: "store-9fb2e733-efb3-44e1-98c7-7e017b9c43b4", // 고객사 storeId로 변경해주세요.
        paymentId: `payment-${crypto.randomUUID().replace(/[{}]/g, "")}`,
        orderName: "나이키 와플 트레이너 2 SD",
        totalAmount: 1000,
        currency: "CURRENCY_KRW",
        channelKey: "channel-key-f062cfc3-6c3e-4436-839d-c8d6b6bfe482", // 콘솔 결제 연동 화면에서 채널 연동 시 생성된 채널 키를 입력해주세요.
        payMethod: "EASY_PAY",
    });

    if (response != null) {
        return alert(response.message);
    }

    // 서버 연결 파트는 우선 api 미완성

    // const notified = await fetch(`${SERVER_BASE_URL}/payment/complete`, {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify({
    //         paymentId: response.paymentId,  // response에서 받은 paymentId
    //         // 추가적인 주문 정보 (예: 주문 ID, 결제 금액 등)
    //     }),
    // });
    //
    // if (notified.ok) {
    //     alert('결제가 성공적으로 완료되었습니다.');
    // } else {
    //     alert('결제 정보 전송에 실패했습니다.');
    // }
};
