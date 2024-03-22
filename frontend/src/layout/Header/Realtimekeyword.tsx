import React, { useEffect, useState } from 'react';
import styles from './Realtimekeyword.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const Realtimekeyword = () => {
  const [number, setNumber] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNumber((prevNumber) => prevNumber + 1);

      if (number >= 10) {
        setNumber(1);
      }
    }, 2000);

    return () => clearInterval(intervalId);
  }, [number]);

  const openRankModal = () => {
    console.log('모달창 열기');
  };

  return (
    <div className={styles.container}>
      <span className={styles.keyword}>
        <a>{number}</a> 실시간 검색어
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
