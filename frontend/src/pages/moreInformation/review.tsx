import React, {useEffect, useRef, useState} from 'react';
import axiosInstance from "../../utils/error/axiosInstance";
import {ProductDetails} from "./SaleInformation";
import styles from "./productInqulry.module.css";

interface insertReview {
    detailedProductReviewContents: string
    oneLineProductReviewContents: string
    orderDetailId: string
    productId: string
    productRating: string
    productReviewImages: string
}

const Review = () => {
    const [data, setData] = useState<ProductDetails[]>([]);
    const [trueAnFalse, setTrueAnFalse] = useState<boolean>(false);
    const modalBackground = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleInsertOnClick = async () => {
            try {
                const response = await axiosInstance.post('/product-review/insert', data)
                console.log(response.data);
            } catch (e) {
                console.log(e)
            }
        }
    }, []);

    const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTrueAnFalse(prev => !prev);
    }


    return (
        <div>
            Review
            {trueAnFalse && (
                <div className={styles.modal_container} ref={modalBackground} onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        setTrueAnFalse(false);
                    }
                }}>
                    <div className={styles.modal_content}>
                        <div className={styles.modal_close_btn}>
                            <p>상품문의</p>
                            <button onClick={() => setTrueAnFalse(false)}>
                                X
                            </button>
                        </div>
                        <form>
                            <textarea className={styles.modal_textarea}
                                      placeholder="문의하실 내용을 입력하세요"
                                      cols={30}
                                      rows={5}
                                      maxLength={1000}
                            ></textarea>
                            <div className={styles.character_count}>/1000</div>
                            <p>문의하신 내용에 대한 답변은 해당 상품의 상세페이지 또는 '쇼핑MY 상품Q&A'에서 확인하실 수 있습니다.</p>
                            <button onClick={handleModal} className={styles.modal_form_btn}>
                                취소하기
                            </button>
                            <div>
                                <p className={styles.modal_form_text}>상품 Q&A 작성 유의사항</p>
                                <div className={styles.modal_form_qa}>
                                    <p>* 개인정보(주민번호, 연락처, 주소, 계좌번호, 카드번호 등)가 포함되지 않도록 유의해주세요.</p>
                                    <p>상품 Q&A는 상품 및 상품 구매 과정(배송, 반품/취소, 교환/변경)에 대해 판매자에게 문의하는 ​게시판입니다.</p>
                                    <p>상품 및 상품 구매 과정과 관련 없는 비방/욕설/명예훼손성 게시글 및 상품과 관련 없는 광고글 등 부적절한 게시글 등록 시 글쓰기 제한 및
                                        게시글이 삭제
                                        조치
                                        될 수 있습니다</p>
                                    <p>전화번호, 이메일 등 개인 정보가 포함된 글 작성이 필요한 경우 판매자만 볼 수 있도록 비밀글로 문의해 주시기 바랍니다.</p>
                                    <p>상품에 대한 이용 후기는 리뷰에 남겨 주세요.</p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <button onClick={handleModal}>리뷰 달기</button>
        </div>
    );
};

export default Review;