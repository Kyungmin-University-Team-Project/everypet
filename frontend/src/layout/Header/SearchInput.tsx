import React, {useEffect, useRef, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import styles from './SearchInput.module.css';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../redux/store/store';
import {setSearchInput} from '../../redux/features/searchSlice';
import {FaMagnifyingGlass} from "../../icons/Icons";

// TODO: 최근검색어 구현하기
const SearchInput = () => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const navigate = useNavigate();
    const inputContainerRef = useRef<HTMLDivElement>(null);
    const inputValue = useSelector((state: RootState) => state.search.input);
    const [isInputClicked, setIsInputClicked] = useState<boolean>(false);
    // TODO: 로컬스토리지에 최근 검색어 저장하기 (최대 10개 최신순으로)
    const recentSearches: string[] = ['검색어1', '검색어2', '검색어3'];

    useEffect(() => {
        dispatch(setSearchInput(''));
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

    const handleInputToggle = () => {
        setIsInputClicked(prevState => !prevState);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (inputContainerRef.current && !inputContainerRef.current.contains(e.relatedTarget as Node)) {
            setIsInputClicked(false);
        }
    };

    const navigateToSearchResults = (query: string) => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
    };

    const handleSearchClick = () => {
        navigateToSearchResults(inputValue);
        setIsInputClicked(false);
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

    // 빈 문자열을 제외한 검색어 필터링
    const filteredSearches = recentSearches.filter(search => search.trim() !== '');

    return (
        <div
            className={`${isInputClicked ? styles.search__container__write : styles.search__container}`}
            ref={inputContainerRef}
            onBlur={handleBlur}
            tabIndex={-1}
        >
            <input
                type='text'
                className={styles.search__input}
                value={inputValue}
                onChange={handleInputChange}
                onClick={handleInputToggle}
                onKeyDown={handleKeyPress}
                placeholder="검색어를 입력해 주세요"
            />
            <button className={styles.search__btn} onClick={handleSearchClick}>
               <FaMagnifyingGlass/>
            </button>

            {isInputClicked && (
                <div className={styles.historyContainer}>
                    {filteredSearches.length > 0 ? (
                        <ul className={styles.historyList}>
                            <div className={styles.historyList__header}>
                                <span>최근검색어</span>
                                <button className={styles.close__btn} onClick={handleInputToggle}>전체삭제</button>
                            </div>
                            <div className={styles.historyItem__container}>
                                {filteredSearches.map((search, _index) => (
                                    <li key={search}
                                        className={styles.historyItem}
                                        onClick={() => handleSearchItemClick(search)}>
                                        <FaMagnifyingGlass/>
                                        {search}
                                    </li>
                                ))}
                            </div>
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
