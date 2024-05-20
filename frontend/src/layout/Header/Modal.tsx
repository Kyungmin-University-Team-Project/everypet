// Modal.tsx
import React from 'react';
import styles from './Modal.module.css';
import { Ranking } from '../../typings/layout';
import { IoIosArrowUp } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  rankings: Ranking[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, rankings }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <IoIosArrowUp className={styles.closeButton} onClick={onClose} />
        <div className={styles.modalHeader}>실시간 검색어</div>
        <ul className={styles.modalList}>
          {rankings.map((ranking) => (
            <li key={ranking.rank} className={styles.modalListItem}>
              {ranking.rank}. {ranking.keyword}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
