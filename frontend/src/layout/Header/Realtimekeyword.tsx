import React, { useEffect, useState } from 'react';
import styles from './Realtimekeyword.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { Ranking } from '../../typings/layout';

const Realtimekeyword = () => {
  const [rankings, setRankings] = useState<Ranking[]>([]);

  const [currentRank, setCurrentRank] = useState(1);

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

  // 실시간 검색어 모달창 열기
  const openRankModal = () => {
    console.log('모달창 열기');
  };

  const currentRanking = rankings.find((item) => item.rank === currentRank);

  // 실시간 검색어 누르면 해당 키워드로 검색
  const searchKeyword = () => {
    console.log(currentRanking?.rank, currentRanking?.keyword);
  };

  return (
    <div className={styles.container}>
      <span className={styles.rank__container} onClick={searchKeyword}>
        {currentRanking && (
          <>
            <span className={styles.rank}>{currentRanking.rank}</span>
            <span className={styles.keyword}>{currentRanking.keyword}</span>
          </>
        )}
      </span>
      <FontAwesomeIcon
        icon={faChevronDown}
        onClick={openRankModal}
        className={styles.open}
      />
    </div>
  );
};

export default Realtimekeyword;
