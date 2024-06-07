import React from 'react';
import styles from './MobileSearchModal.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {FiArrowLeft} from "react-icons/fi";

interface MobileSearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileSearchModal: React.FC<MobileSearchModalProps> = ({isOpen, onClose}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modal}>
            <div className={styles.modalHeader}>
                <button className={styles.backButton} onClick={onClose}>
                    <FiArrowLeft/>
                </button>
                <div className={styles.searchContainer}>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="검색어를 입력해 주세요."
                    />
                    <button className={styles.searchButton}>
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
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
