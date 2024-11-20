import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './RealtimeKeyword.module.css';
import RealtimeKeywordModal from './RealtimeKeywordModal';
import {Ranking} from '../../typings/layout';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import {IoIosArrowDown} from "../../icons/Icons";
import {API_URL} from "../../api/api";

const RealtimeKeyword = () => {
    const [rankings, setRankings] = useState<Ranking[]>([]);
    const [currentRank, setCurrentRank] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // 실시간 순위 데이터를 불러오는 함수
        const fetchRankings = async () => {
            try {
                const response = await axios.post(`${API_URL}/keyword-rank/real-time-rank`);
                setRankings(response.data);
            } catch (error) {
                console.error('Error fetching real-time keyword rankings:', error);
            }
        };

        // 데이터 불러오기
        fetchRankings();

        // 실시간 순위 업데이트 (2초마다 순위 변경)
        const intervalId = setInterval(() => {
            setCurrentRank((prevRank) => (prevRank % 10) + 1);
        }, 2000);

        return () => clearInterval(intervalId);  // 컴포넌트 언마운트 시 인터벌 클리어
    }, []);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            closeRankModal();
        }
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen, handleClickOutside]);

    const openRankModal = () => {
        setIsModalOpen(true);
    };

    const closeRankModal = () => {
        setIsModalOpen(false);
    };

    const currentRanking = rankings.find((item) => item.ranking === currentRank);

    const searchKeyword = () => {
        if (currentRanking) {
            navigate(`/search?query=${encodeURIComponent(currentRanking.keyword)}`);
        }
    };

    return (
        <div className={styles.container} ref={containerRef}>
            {currentRanking && (
                <div className={styles.rank__container} onClick={searchKeyword}>
                    <span className={styles.rank}>{currentRanking.ranking}</span>
                    <span className={styles.keyword}>{currentRanking.keyword}</span>
                </div>
            )}
            <div className={styles.icon__wrap}>
                <IoIosArrowDown onClick={openRankModal} size={25}/>
            </div>

            {isModalOpen && (
                <div className={styles.modalWrapper} ref={modalRef}>
                    <RealtimeKeywordModal
                        isOpen={isModalOpen}
                        onClose={closeRankModal}
                        rankings={rankings}
                    />
                </div>
            )}
        </div>
    );
};

export default RealtimeKeyword;
