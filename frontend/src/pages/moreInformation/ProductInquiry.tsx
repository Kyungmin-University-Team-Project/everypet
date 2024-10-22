import React, {useRef, useState} from 'react';
import styles from '../moreInformation/productInqulry.module.css';

const ProductInquiry: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [text, setText] = useState('');
    const modalBackground = useRef<HTMLDivElement>(null);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const closeModal = () => {
        setText(''); // Reset the text when the modal is closed
        setModalOpen(false);
    };

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
                            <p>상품문의</p>
                            <button onClick={() => setModalOpen(false)}>
                                X
                            </button>
                        </div>
                        <form>
                            <div>
                                <label>
                                    상품 정보
                                    <input className={styles.modal_input} placeholder='예)수량 5개 주문이 가능한가요?'/>
                                </label>
                            </div>
                            <textarea className={styles.modal_textarea}
                                      placeholder="문의하실 내용을 입력하세요"
                                      cols={30}
                                      rows={5}
                                      maxLength={1000}
                                      value={text}
                                      onChange={handleTextChange}></textarea>
                            <div className={styles.character_count}>{text.length}/1000</div>
                            <p>문의하신 내용에 대한 답변은 해당 상품의 상세페이지 또는 '쇼핑MY 상품Q&A'에서 확인하실 수 있습니다.</p>
                            <button onClick={closeModal} className={styles.modal_form_btn}>
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
        </div>
    );
};

export default ProductInquiry;
