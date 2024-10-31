import React, {useEffect, useRef, useState} from 'react';
import styles from '../moreInformation/productInqulry.module.css';
import axiosInstance from "../../utils/error/axiosInstance";
import axios from "axios";
import Pagination from 'react-js-pagination';

interface ProductInquiryProps {
    productId: string | null;
}

interface Inquiry {
    content: string;
    productId: string;
    title: string;
}

interface List {
    inquiryContents: string;
    inquiryDate: string;
    inquiryDeleteDate: string;
    inquiryStatus: string;
    inquiryTitle: string;
    inquiryUpdateDate: string;
    memberId: string;
    productId: string;
    sellerInquiryId: number;
}

const MAX = 500;
const TITLE = 30;

const ProductInquiry: React.FC<ProductInquiryProps> = ({productId}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [text, setText] = useState<Inquiry>({
        content: '',
        productId: productId || '',
        title: '',
    });
    const modalBackground = useRef<HTMLDivElement>(null);
    const [contentLength, setContentLength] = useState<number>(0);
    const [titleLength, setTitleLength] = useState<number>(0);
    const [listType, setListType] = useState<List[]>([]);
    // slice 보여줄 리스트
    const [currentPage, setCurrentPage] = useState(0);
    // slice 담을 데이터
    const [currentList, setCurrentList] = useState<List[]>([]);
    const itemsPerPage = 12; // 페이지당 항목 수

    useEffect(() => {
        const fetchList = async () => {
            try {
                const page = currentPage; // 페이지가 0부터 시작하도록 조정
                const size = itemsPerPage;
                const sort = 'createdDate,desc';
                const url = `http://localhost:8080/support/seller/inquiry/list/${productId}?${page}&${size}&${sort}`;
                const response = await axios.get(url);
                setListType(response.data.content); // API 응답에서 항목 설정
            } catch (e) {
                console.error(e);
            }
        };
        if (productId) { // productId가 유효할 때만 데이터 가져오기
            fetchList();
        }
    }, [productId, currentPage, modalOpen]); // productId 또는 currentPage가 변경될 때 데이터 가져오기

    // slice할 index에 범위
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    }
    // 페이지 네이션
    useEffect(() => {
        setCurrentList(listType.slice(indexOfFirstItem, indexOfLastItem));
    }, [currentPage]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value, name} = e.target;
        setText((prev) => ({
            ...prev,
            productId: productId || '',
            [name]: value,
        }));
        setContentLength(value.length);
        if (name === 'title') {
            setTitleLength(value.length);
        }
    };

    const handleOnSubmitClick = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/support/seller/inquiry', {...text});
            console.log(response);
            setText({content: '', productId: productId || '', title: ''});
            setModalOpen(false);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div>
                {currentList.map((item) => (
                    <li key={item.sellerInquiryId}>
                        <p>{item.inquiryDate}</p>
                        <p>제목: {item.inquiryTitle}</p>
                        <p>내용: {item.inquiryContents}</p>
                    </li>
                ))}
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={itemsPerPage}
                    totalItemsCount={listType.length}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={handleChangePage}
                />
            </div>
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
                                    <p className={styles.modal_input_text}>제목</p>
                                    <input
                                        className={styles.modal_input}
                                        placeholder='예)수량 5개 주문이 가능한가요?'
                                        name='title'
                                        value={text.title}
                                        onChange={handleTextChange}
                                        maxLength={30}
                                    />
                                    <div className={styles.character_count}>{titleLength}/{TITLE}</div>
                                </label>
                            </div>
                            <p className={styles.modal_textarea_p}>문의 내용</p>
                            <textarea
                                className={styles.modal_textarea}
                                placeholder="문의하실 내용을 입력하세요"
                                cols={30}
                                rows={5}
                                name="content"
                                maxLength={500}
                                value={text.content}
                                onChange={handleTextChange}
                            />
                            <div className={styles.character_count}>{contentLength}/{MAX}</div>
                            <p className={styles.modal_p_text}>문의하신 내용에 대한 답변은 해당 상품의 상세페이지 또는 '쇼핑MY 상품Q&A'에서 확인하실 수
                                있습니다.</p>
                            <button className={styles.modal_form_btn}>완료</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductInquiry;
