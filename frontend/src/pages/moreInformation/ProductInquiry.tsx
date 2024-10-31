import React, {useRef, useState} from 'react';
import styles from '../moreInformation/productInqulry.module.css';
import axiosInstance from "../../utils/error/axiosInstance";

interface ProductInquiryProps {
    productId: string | null;
}

interface Inquiry {
    content: string;
    productId: string;
    title: string;
}

const ProductInquiry: React.FC<ProductInquiryProps> = ({productId}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [text, setText] = useState<Inquiry>({
        content: '',
        productId: productId || '',
        title: '',
    });
    const modalBackground = useRef<HTMLDivElement>(null);
    console.log(productId)


    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value, name} = e.target;

        setText((prev) => ({
            ...prev,
            productId: productId || '',
            [name]: value
        }));
        console.log(text)
    };


    const handleOnSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = axiosInstance.post('/support/seller/inquiry', {...text});
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <div>
            <div className={styles.btn_wrapper}>
                <p className={styles.modal_text}>상품문의</p>
                <button className={styles.modal_open_button} onClick={() => setModalOpen(true)}>
                    문의하기
                </button>
            </div>
            <ul>
                <li>-구매한 상품의 취소/반품은 마이쿠팡 구매내역에서 신청 가능합니다.</li>
                <li>-상품문의 및 후기게시판을 통해 취소나 환불, 반품 등은 처리되지 않습니다.</li>
                <li>-가격, 판매자, 교환/환불 및 배송 등 해당 상품 자체와 관련 없는 문의는 고객센터 내 1:1 문의하기를 이용해주세요.</li>
                <li>-"해당 상품 자체"와 관계없는 글, 양도, 광고성, 욕설, 비방, 도배 등의 글은 예고 없이 이동, 노출제한, 삭제 등의 조치가 취해질 수 있습니다.</li>
                <li>-공개 게시판이므로 전화번호, 메일 주소 등 고객님의 소중한 개인정보는 절대 남기지 말아주세요.</li>
            </ul>
            {modalOpen && (
                <div className={styles.modal_container} ref={modalBackground} onClick={(e) => {
                    if (e.target === modalBackground.current) {
                        setModalOpen(false);
                    }
                }}>
                    <div className={styles.modal_content}>
                        <div className={styles.modal_close_btn}>
                            <p className={styles.modal_close_text}>상품문의</p>
                            <button className={styles.modal_close_x} onClick={() => setModalOpen(false)}>
                                X
                            </button>
                        </div>
                        <form onSubmit={handleOnSubmitClick}>
                            <div>
                                <label>
                                    <p className={styles.modal_input_text}>
                                        제목
                                    </p>
                                    <input className={styles.modal_input} placeholder='예)수량 5개 주문이 가능한가요?' name='title'
                                           value={text.title} onChange={handleTextChange}/>
                                </label>
                            </div>
                            <p className={styles.modal_textarea_p}>문의 내용</p>
                            <textarea className={styles.modal_textarea}
                                      placeholder="문의하실 내용을 입력하세요"
                                      cols={30}
                                      rows={5}
                                      name="content"
                                      maxLength={1000}
                                      value={text.content}
                                      onChange={handleTextChange}></textarea>
                            <div className={styles.character_count}>/1000</div>
                            <p className={styles.modal_p_text}>문의하신 내용에 대한 답변은 해당 상품의 상세페이지 또는 '쇼핑MY 상품Q&A'에서 확인하실 수
                                있습니다.</p>
                            <button className={styles.modal_form_btn}>
                                완료
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductInquiry;
