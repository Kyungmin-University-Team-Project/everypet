import React from 'react';
import styles from './Categorybarbtn.module.css';
import {RxHamburgerMenu} from "../../icons/Icons";

const Categorybarbtn = ({isOpen, setOpen, setClose}: any) => {
    const handleClick = () => {
        if (isOpen) {
            setClose();
        } else {
            setOpen();
        }
    };

    return (
        <div className={styles.categorybar} onClick={handleClick}>
            <RxHamburgerMenu size={28}/>
        </div>
    );
};

export default Categorybarbtn;
