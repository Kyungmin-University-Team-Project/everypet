import React, { JSX, useEffect, useRef, useState } from 'react';
import axiosInstance from "../../utils/error/axiosInstance";
import styles from "./productInqulry.module.css";
import { FaRegStar, FaStar } from "../../icons/Icons";
import { useLocation } from "react-router-dom";
import {API_URL} from "../../api/api";
import {log} from "node:util";


interface InsertReview {
    detailedProductReviewContents: string;
    oneLineProductReviewContents: string;
    orderDetailId: number;
    productId: string;
    productRating: string;
    productReviewImages: File[];
}

const Review = () => {
    const location = useLocation();
    const productData = location.state;
    const [data, setData] = useState<InsertReview>({
        detailedProductReviewContents: "",
        oneLineProductReviewContents: "",
        orderDetailId: 1,
        productId: productData.item.productId,
        productRating: "",
        productReviewImages: [],
    });
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const modalBackground = useRef<HTMLDivElement>(null);
    const [stars, setStars] = useState<JSX.Element[]>([]);
    const [rating, setRating] = useState<number>(0);
    const MAX_CHARS = 500;
    const ONE_MAX_CHARS = 30;

    const handleModalToggle = () => {
        setIsModalOpen((prev) => !prev);
    };

    useEffect(() => {
        const updatedStars = Array.from({ length: 5 }, (_, i) => (
            <span
                key={i + 1}
                onClick={() => handleStarClick(i + 1)}
                style={{ cursor: 'pointer' }}
            >
            {i + 1 <= rating ? <FaStar className={styles.FaStar}/> : <FaRegStar className={styles.form_star}/>}
        </span>
        ));
        setStars(updatedStars);
    }, [rating]);

    const handleStarClick = (index: number) => {
        setRating(index);
        setData((prevData) => ({
            ...prevData,
            productRating: index.toString(),
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('detailedProductReviewContents', data.detailedProductReviewContents);
        formData.append('oneLineProductReviewContents', data.oneLineProductReviewContents);
        formData.append('orderDetailId', data.orderDetailId.toString()); // Convert number to string
        formData.append('productId', data.productId);
        formData.append('productRating', data.productRating);

        if (data.productReviewImages && Array.isArray(data.productReviewImages)) {
            data.productReviewImages.forEach((file, index) => {
                formData.append(`productReviewImages[${index}]`, file);
            });
        } else if (data.productReviewImages) {
            formData.append('productReviewImages', data.productReviewImages);
        } else {
            console.log('No image available');
            return;
        }

        try {
            const response = await axiosInstance.post(`${API_URL}/product-review/insert`, formData, {
                headers: {
                },
            });
            console.log(response.data);
        } catch (e) {
            console.error(e);
        }
    };



    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, value, files } = e.target as HTMLInputElement;

        if (type === "file" && files) {
            const maxSize = 5 * 1024 * 1024;


            const validFiles = Array.from(files).filter(file => {
                const isImage = file.type.startsWith('image/');
                return isImage && file.size <= maxSize;
            });

            if (validFiles.length > 0) {
                setData((prev) => ({
                    ...prev,
                    productReviewImages: [...prev.productReviewImages, ...validFiles] // Append new files
                }));
            } else {
                alert("파일은 5MB 이하의 이미지 파일이어야 합니다.");
            }
        } else if (name === "oneLineProductReviewContents" && value.length <= ONE_MAX_CHARS) {
            setData((prev) => ({ ...prev, [name]: value }));
        } else if (name === "detailedProductReviewContents" && value.length <= MAX_CHARS) {
            setData((prev) => ({ ...prev, [name]: value }));
        }
    };


    return (
        <div>
            {isModalOpen && (
                <div
                    className={styles.modal_container}
                    ref={modalBackground}
                    onClick={(e) => e.target === modalBackground.current && setIsModalOpen(false)}
                >
                    <div className={styles.modal_content}>
                        <div className={styles.modal_close_btn}>
                            <div className={styles.modal_close_box}>
                                <p>상품 품질 리뷰</p>
                            </div>
                            <button onClick={() => setIsModalOpen(false)}>X</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <p className={styles.form_textMain}>상세리뷰</p>
                            <textarea
                                className={styles.modal_textarea}
                                placeholder="문의하실 내용을 입력하세요"
                                name="detailedProductReviewContents"
                                value={data.detailedProductReviewContents}
                                onChange={handleOnChange}
                                cols={30}
                                rows={5}
                                maxLength={MAX_CHARS}
                            ></textarea>
                            <div className={styles.character_count}>
                                {data.detailedProductReviewContents.length}/{MAX_CHARS}
                            </div>
                            <div className={styles.form_star}>
                                <span className={styles.form_starText}>별점: </span>
                                {stars}
                            </div>
                            <label className={styles.file_boxText}>
                                사진 첨부하기:
                                <input
                                    type="file"
                                    name="productReviewImages"
                                    onChange={handleOnChange}
                                    accept=".jpg, .jpeg, .png"
                                />
                            </label>
                            <label>
                                <p className={styles.file_box}>한줄요약</p>
                                <input
                                    type="text"
                                    name="oneLineProductReviewContents"
                                    value={data.oneLineProductReviewContents}
                                    placeholder="한 줄 요약을 입력해주세요"
                                    onChange={handleOnChange}
                                    maxLength={ONE_MAX_CHARS}
                                />
                                <div className={styles.character_count}>
                                    {data.oneLineProductReviewContents.length}/{ONE_MAX_CHARS}
                                </div>
                            </label>
                            <button type="submit" className={styles.modal_form_btn}>
                                등록하기
                            </button>
                        </form>
                    </div>
                </div>
            )}
            <button onClick={handleModalToggle}>리뷰 달기</button>
        </div>
    );
};

export default Review;
