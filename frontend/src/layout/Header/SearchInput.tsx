import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SearchInput.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { setSearchInput } from '../../redux/features/searchSlice';

const SearchInput = () => {
    const dispatch = useDispatch<AppDispatch>();
    const inputValue = useSelector((state: RootState) => state.search.input);
    const location = useLocation();
    const navigate = useNavigate();
    const [isInputClicked, setIsInputClicked] = useState<boolean>(false);
    const recentSearches: string[] = ['검색어1', '검색어2', '검색어3']; // 예시 데이터
    const inputContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(setSearchInput('')); // Reset input value
    }, [location, dispatch]);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchInput(e.target.value));
    };

    const handleSearchClick = () => {
        navigateToSearchResults(inputValue);
        setIsInputClicked(false); // 검색 버튼 클릭 시 닫기
    };

    const handleInputToggle = () => {
        setIsInputClicked(prevState => !prevState);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (inputContainerRef.current && !inputContainerRef.current.contains(e.relatedTarget as Node)) {
            setIsInputClicked(false);
        }
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (inputContainerRef.current && !inputContainerRef.current.contains(e.target as Node)) {
            setIsInputClicked(false);
        }
    };

    const handleSearchItemClick = (search: string) => {
        navigateToSearchResults(search);
        setIsInputClicked(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            navigateToSearchResults(inputValue);
            setIsInputClicked(false);
        }
    };

    const navigateToSearchResults = (query: string) => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };

    // 빈 문자열을 제외한 검색어 필터링
    const filteredSearches = recentSearches.filter(search => search.trim() !== '');

    return (
        <div
            className={`${isInputClicked ? styles.search__container__write : styles.search__container}`}
            ref={inputContainerRef}
            onBlur={handleBlur}
            tabIndex={-1} // div 요소가 블러 이벤트를 받을 수 있도록
        >
            <input
                type='text'
                className={styles.search__input}
                value={inputValue}
                onChange={handleInputChange}
                onClick={handleInputToggle}
                onKeyPress={handleKeyPress}
                placeholder="검색어를 입력해 주세요"
            />
            <button className={styles.search__btn} onClick={handleSearchClick}>
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>

            {isInputClicked && (
                <div className={styles.historyContainer}>
                    {filteredSearches.length > 0 ? (
                        <ul className={styles.historyList}>
                            <div className={styles.historyList__header}>
                                <span>최근검색어</span>
                                <button className={styles.close__btn} onClick={handleInputToggle}>전체삭제</button>
                            </div>
                            {filteredSearches.map((search) => (
                                <li key={search} className={styles.historyItem} onClick={() => handleSearchItemClick(search)}>
                                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                                    {search}
                                </li>
                            ))}
                            <div className={styles.historyList__footer}>
                                <button className={styles.auto__save}>자동 저장 끄기</button>
                                <button className={styles.close__btn} onClick={handleInputToggle}>닫기</button>
                            </div>
                        </ul>
                    ) : (
                        <div className={styles.noHistory}>
                            <span>최근 검색어 내역이 없습니다.</span>
                            <div className={styles.historyList__footer}>
                                <button className={styles.auto__save}>자동 저장 끄기</button>
                                <button className={styles.close__btn} onClick={handleInputToggle}>닫기</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchInput;
