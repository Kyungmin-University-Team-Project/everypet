import React, { useState } from 'react';
import styles from './Searchinput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Searchinput = () => {
  const [placeholder, setPlaceholder] =
    useState('뭉치한테 새 간식이나 사줄까?');

  const [inputValue, setInputValue] = useState('강아지 간식');
  // 첫 화면에서 플레이스홀더의 내용을 검색가능함
  // 나중에 객체로 만들기

  const handleSearch = () => {
    setPlaceholder(''); // input 요소의 값을 비웁니다.

    console.log('성공');
  };

  const handleSearchClick = () => {
    console.log(inputValue);
  };

  return (
    <div className={styles.container}>
      <input
        placeholder={placeholder}
        type='text'
        className={styles.search__input}
        onClick={handleSearch}
        // 검색 기능은 아직
      />
      <button className={styles.search__btn} onClick={handleSearchClick}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
    </div>
  );
};

export default Searchinput;
