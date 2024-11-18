import React, {useState, useEffect} from 'react';
import styles from './Header.module.css';
import {Link, useLocation} from 'react-router-dom';
import useToggle from '../../utils/common/ToggleUtil';
import Categorymodal from '../category/CategoryModal';
import Searchinput from './SearchInput';
import UserMenu from './UserMenu';
import TopMenu from './TopMenu';
import MobileSearchModal from "../mobile/MobileSearchModal";
import Productcategory from "../category/ProductCategory";
import useScrollPosition from "../../hooks/useScrollPosition";

const Header: React.FC = () => {
    const [isOpen, toggleOn, toggleOff] = useToggle(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const isVisible = useScrollPosition(0);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, []);

    return (
        <div className={isVisible ? styles.container : styles.scrollContainer}>

            <TopMenu/>
            <header className={styles.innerContainer}>
                <div className={isMobile ? styles.innerMobile : styles.inner}>
                    <div className={styles.top__menu}>
                        <Link to='/' className={styles.title}>
                            에브리펫
                        </Link>
                        {isMobile && <UserMenu/>}
                    </div>
                    {isMobile ? (
                        <button className={styles.searchButton} onClick={() => setIsSearchOpen(true)}>
                            <Searchinput/>
                        </button>
                    ) : (
                        <Searchinput/>
                    )}
                    {!isMobile && <UserMenu/>}
                </div>
                <Productcategory/>
            </header>

            <Categorymodal isOpen={isOpen} setOpen={toggleOn} setClose={toggleOff}/>
            <MobileSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)}/>
        </div>
    );
};

export default Header;
