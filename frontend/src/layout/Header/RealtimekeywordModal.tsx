import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './RealtimekeywordModal.module.css';
import {Ranking} from '../../typings/layout';
import {format, addMinutes} from 'date-fns';
import {ko} from 'date-fns/locale';
import {IoIosArrowUp} from 'react-icons/io';
import {FaLongArrowAltUp, FaLongArrowAltDown} from 'react-icons/fa';
import {CgBorderStyleSolid} from 'react-icons/cg';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    rankings: Ranking[];
}

const RealtimekeywordModal: React.FC<ModalProps> = ({isOpen, onClose, rankings}) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    // 현재 시간을 10분 단위로 반올림
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const roundedMinutes = Math.floor(minutes / 10) * 10;
    const roundedDate = addMinutes(currentDate, roundedMinutes - minutes);
    const formattedDate = format(roundedDate, 'yyyy.MM.dd HH:mm', {locale: ko});


    // 순위 변동 아이콘 렌더링
    const renderTrendIcon = (rankingGap: number) => {
        if (rankingGap > 0) {
            return <FaLongArrowAltUp className={styles.upArrow}/>
        } else if ((rankingGap < 0)) {
            return <FaLongArrowAltDown className={styles.downArrow}/>
        } else {
            return <CgBorderStyleSolid className={styles.steady}/>;
        }
    };

    // 검색 페이지로 이동
    const navigateToSearchResults = (query: string) => {
        navigate(`/search?query=${encodeURIComponent(query)}`);
        onClose(); // 모달 닫기
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <IoIosArrowUp className={styles.closeButton} onClick={onClose}/>
                <div className={styles.modalHeader}>
                    실시간 쇼핑 검색어
                    <div className={styles.modalDate}>{formattedDate} 기준</div>
                </div>
                <ul className={styles.modalList}>
                    {rankings.map((ranking) => (
                        <li key={ranking.ranking} className={styles.modalListItem}>
                            <div
                                className={styles.modalList__inner}
                                onClick={() => navigateToSearchResults(ranking.keyword)}
                            >
                                <div className={styles.rank__inner}>
                                    <span className={styles.rank}>{ranking.ranking}</span>
                                    <span className={styles.rank__text}>{ranking.keyword}</span>
                                </div>
                                <span className={styles.trend}>
                                    {renderTrendIcon(ranking.rankingGap)}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RealtimekeywordModal;
