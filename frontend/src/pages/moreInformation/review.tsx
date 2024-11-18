import React, {JSX, useEffect, useRef, useState} from 'react';
import axiosInstance from "../../utils/error/axiosInstance";
import styles from "./productInqulry.module.css";
import {FaRegStar, FaStar} from "../../icons/Icons";
import {API_URL} from "../../api/api";

// 1. 리뷰 상세
// 2. 리뷰 한줄
// 3. 상세주문 아이디
// 4.상품아이디
// 5. 별점
// 6. 리뷰 이미지

interface insertReview {
    detailedProductReviewContents: string
    oneLineProductReviewContents: string
    orderDetailId: string
    productId: string
    productRating: string
    productReviewImages: string
}


const Review = () => {
    const [data, setData] = useState<insertReview[]>([]);
    const [trueAnFalse, setTrueAnFalse] = useState<boolean>(false);
    const modalBackground = useRef<HTMLDivElement>(null);
    const [star, setStar] = useState<JSX.Element[]>([]);
    const [rating, setRating] = useState<number>(0);
    const [text, setText] = useState("");
    const [oneLine, setOneLine] = useState<string>("");
    const MAX_CHARS = 500;
    const ONE_MAX_CHARS = 30;

    useEffect(() => {
        const handleInsertOnClick = async () => {
            try {
                const response = await axiosInstance.post(`${API_URL}/product-review/insert`, data)
                console.log(response.data);
            } catch (e) {
                console.log(e)
            }
        }
    }, []);

    const handleModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        setTrueAnFalse(prev => !prev);
    }

    useEffect(() => {
        const newStars: JSX.Element[] = [];
        for (let i = 1; i <= 5; i++) {
            newStars.push(
                <span
                    key={i} // 각 별에 고유한 키를 추가합니다.
                    onClick={() => handleOnStarClick(i)}
                    style={{cursor: 'pointer'}}
                >
                    {i <= rating ? <FaStar/> : <FaRegStar key={i}/>}
                </span>
            );
        }
        setStar(newStars);
    }, [rating]);

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS) {
            setText(value)
        }
    }

    const handleOneTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= ONE_MAX_CHARS) {
            setOneLine(value)
        }
    }

    const handleOnStarClick = (index: number) => {
        setRating(index)
    }


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
                            <div className={styles.modal_close_box}>
                                <p>상품 품질 리뷰</p>
                            </div>
                            <button onClick={() => setTrueAnFalse(false)}>
                                X
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <p className={styles.form_textMain}>상세리뷰</p>
                            <textarea className={styles.modal_textarea}
                                      placeholder="문의하실 내용을 입력하세요"
                                      cols={30}
                                      rows={5}
                                      maxLength={500}
                                      onChange={handleTextChange}
                            ></textarea>
                            <div className={styles.character_count}>{text.length}/{MAX_CHARS}</div>
                            <div className={styles.form_star}>
                                <span className={styles.form_starText}>별점: </span>
                                {star}
                            </div>
                            <p className={styles.form_text}>문의하신 내용에 대한 답변은 해당 상품의 상세페이지 또는 '마이페이지 문의내역'에서 확인하실 수
                                있습니다.</p>
                            <label htmlFor="" className={styles.file_boxText}>
                                사진 첨부하기 :
                                <input type="file" accept="image/*"/>
                            </label>
                            <label htmlFor="" className={styles.file_box}>
                                <p className={styles.file_box}>한줄요약</p>
                                <input type="text" placeholder='한 줄 요약을 입력해주세요'
                                       onChange={handleOneTextChange} maxLength={30}/>
                                <div className={styles.character_count}>{oneLine.length}/{ONE_MAX_CHARS}</div>
                            </label>

                            <button onClick={handleModal} className={styles.modal_form_btn}>
                                등록하기
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <button onClick={handleModal}>리뷰 달기</button>
        </div>
    );
};

export default Review;