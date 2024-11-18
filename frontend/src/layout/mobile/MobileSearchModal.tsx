import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './MobileSearchModal.module.css';
import {FaMagnifyingGlass, FiArrowLeft} from "../../icons/Icons";
import {API_URL} from "../../api/api";

interface MobileSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({isOpen, onClose}) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSearchClick = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
            onClose();
        }
    };

    // TODO: onKeyDown 에서 직접 분기문 작성해서 handleSearchClick 호출하도록 수정
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalHeader}>
                <button className={styles.backButton} onClick={onClose}>
                    <FiArrowLeft/>
                </button>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        ref={inputRef} // 인풋 요소에 ref 추가
                        className={styles.searchInput}
                        placeholder="검색어를 입력해 주세요."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button className={styles.searchButton} onClick={handleSearchClick}>
                        <FaMagnifyingGlass/>
                    </button>
                </div>
            </div>
            <div className={styles.modalContent}>
                <p>최근 검색어 내역이 없습니다.</p>
                <p>설정이 초기화된다면 도움말을 확인해 주세요.</p>
                <button className={styles.closeButton} onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default MobileSearchModal;
