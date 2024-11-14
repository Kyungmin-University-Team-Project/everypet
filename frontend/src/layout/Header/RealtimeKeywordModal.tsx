import React from 'react';
import {useNavigate} from 'react-router-dom';
import styles from './RealtimeKeywordModal.module.css';
import {Ranking} from '../../typings/layout';
import {addMinutes, format} from 'date-fns';
import {ko} from 'date-fns/locale';
import {CgBorderStyleSolid, FaLongArrowAltDown, FaLongArrowAltUp, IoIosArrowUp} from "../../icons/Icons";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    rankings: Ranking[];
}

const RealtimeKeywordModal: React.FC<ModalProps> = ({isOpen, onClose, rankings}) => {
    const navigate = useNavigate();

    // if (!isOpen) return null;

    // 현재 시간을 10분 단위로 반올림
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const roundedMinutes = Math.floor(minutes / 10) * 10;
    const roundedDate = addMinutes(currentDate, roundedMinutes - minutes);
    const formattedDate = format(roundedDate, 'yyyy.MM.dd HH:mm', {locale: ko});


    // 순위 변동 아이콘 렌더링
    const renderTrendIcon = (rankingGap: number) => {
        if (rankingGap > 0) {
            return <FaLongArrowAltUp size={16} className={styles.FaLongArrowAltUp}/>
        } else if ((rankingGap < 0)) {
            return <FaLongArrowAltDown size={16} className={styles.FaLongArrowAltDown}/>
        } else {
            return <CgBorderStyleSolid size={16} className={styles.CgBorderStyleSolid}/>;
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
                <div className={styles.modalContent__wrap}>
                    <div className={styles.modalHeader}>
                        실시간 쇼핑 검색어
                        <div className={styles.modalDate}>{formattedDate} 기준</div>
                    </div>
                    <IoIosArrowUp className={styles.IoIosArrowUp} size={24} onClick={onClose}/>
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

export default RealtimeKeywordModal;
