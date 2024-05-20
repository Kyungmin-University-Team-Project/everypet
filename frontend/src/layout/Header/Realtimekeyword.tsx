import React, { useEffect, useState, useRef, useCallback } from 'react';
import styles from './Realtimekeyword.module.css';

import Modal from './Modal';
import { Ranking } from '../../typings/layout';
import { IoIosArrowDown } from 'react-icons/io';

const Realtimekeyword = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [currentRank, setCurrentRank] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // mock 데이터 로드
    fetch('/mock/real_rank.json')
      .then((response) => response.json())
      .then((data) => setRankings(data))
      .catch((error) => console.error('Error fetching real_rank.json:', error));

    // 실시간 순위 업데이트
    const intervalId = setInterval(() => {
      // 1~10 까지
      setCurrentRank((prevRank) => (prevRank % 10) + 1);
    }, 2000);

    return () => clearInterval(intervalId);
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

  // 실시간 검색어 모달창 열기
  const openRankModal = () => {
    setIsModalOpen(true);
  };

  const closeRankModal = () => {
    setIsModalOpen(false);
  };

  const currentRanking = rankings.find((item) => item.rank === currentRank);

  // 실시간 검색어 누르면 해당 키워드로 검색
  const searchKeyword = () => {
    console.log(currentRanking?.rank, currentRanking?.keyword);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <span className={styles.rank__container} onClick={searchKeyword}>
        {currentRanking && (
          <>
            <span className={styles.rank}>{currentRanking.rank}</span>
            <span className={styles.keyword}>{currentRanking.keyword}</span>
          </>
        )}
      </span>
      <IoIosArrowDown onClick={openRankModal} className={styles.open} />

      {isModalOpen && (
        <div className={styles.modalWrapper} ref={modalRef}>
          <Modal
            isOpen={isModalOpen}
            onClose={closeRankModal}
            rankings={rankings}
          />
        </div>
      )}
    </div>
  );
};

export default Realtimekeyword;
