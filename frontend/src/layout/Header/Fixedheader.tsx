import React, {useEffect, useState} from 'react';
import styles from './Fixedheader.module.css';
import Usermenu from './Usermenu';
import Searchinput from './Searchinput';
import {Link} from 'react-router-dom';
import useToggle from '../../utils/common/ToggleUtil';
import Categorybarbtn from '../category/Categorybarbtn';
import TopMenu from './TopMenu';
import MobileSearchModal from "../mobile/MobileSearchModal";
import CategoryModal from "../category/CategoryModal";

const Fixedheader: React.FC = () => {
    const [isOpen, toggleOn, toggleOff] = useToggle(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [scrollY, setScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY); // 스크롤 Y 값을 업데이트
            if (isOpen) {
                toggleOff(); // 스크롤 시 모달이 열려있으면 닫기
                console.log('성공');
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth <= 768);
        });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', () => {
                setIsMobile(window.innerWidth <= 768);
            });
        };
    }, [isOpen, toggleOff]);

    return (
        <div className={scrollY >= 200 ? styles.open : styles.close}>
            <header className={styles.container__fixed}>
                {!isMobile && <TopMenu/>}
                <div className={isMobile ? styles.innerMobile : styles.inner}>
                    <div className={styles.logo__wrap}>
                        {!isMobile && (
                            <Categorybarbtn
                                active={false}
                                isOpen={isOpen}
                                setOpen={toggleOn}
                                setClose={toggleOff}
                            />
                        )}
                        <Link to='/' className={styles.title}>
                            에브리펫
                        </Link>
                    </div>
                    {isMobile ? (
                        <button className={styles.searchButton} onClick={() => setIsSearchOpen(true)}>
                            <Searchinput/>
                        </button>
                    ) : (
                        <Searchinput/>
                    )}
                    {!isMobile && <Usermenu/>}
                </div>
            </header>
            <CategoryModal isOpen={isOpen} setOpen={toggleOn} setClose={toggleOff}/>
            <MobileSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}/>
        </div>
    );
};

export default Fixedheader;