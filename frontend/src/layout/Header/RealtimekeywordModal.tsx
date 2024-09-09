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

    // 현재 실시간으로 시간을 계산중 나중에 최적화 필요
    // 서버에서 현재 시간을 불러오는 api를 만들어서 시간 계산후 10분마다 데이터 수정하는 코드 작성해야함
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const roundedMinutes = Math.floor(minutes / 10) * 10; // 10분 단위로 올림
    const roundedDate = addMinutes(currentDate, roundedMinutes - minutes); // 현재 시간에서 10분 단위로 올림한 시간으로 변경
    const formattedDate = format(roundedDate, 'yyyy.MM.dd HH:mm', {locale: ko});

    const renderTrendIcon = (trend: 'up' | 'down' | 'steady') => {
        if (trend === 'up') {
            return <FaLongArrowAltUp className={styles.upArrow}/>;
        } else if (trend === 'down') {
            return <FaLongArrowAltDown className={styles.downArrow}/>;
        } else {
            return <CgBorderStyleSolid className={styles.steady}/>;
        }
    };

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
                        <li key={ranking.rank} className={styles.modalListItem}>
                            <div className={styles.modalList__inner}
                                 onClick={() => navigateToSearchResults(ranking.keyword)}>
                                <div className={styles.rank__inner}>
                                    <span className={styles.rank}>
                                        {ranking.rank}
                                    </span>
                                    <span className={styles.rank__text}>
                                        {ranking.keyword}
                                    </span>
                                </div>
                                <span className={styles.trend}>
                                    {renderTrendIcon(ranking.trend)}
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
