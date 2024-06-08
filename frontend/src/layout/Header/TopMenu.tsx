import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TopMenu.module.css';

const TopMenu = () => {
    const [memberId, setMemberId] = useState<string | null>(null);

    useEffect(() => {
        const storedMemberId = localStorage.getItem('username');
        setMemberId(storedMemberId);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('access');
        setMemberId(null);
    };

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {memberId ? (
                    <div className={styles.userInfo}>
                        <span>Welcome, {memberId}</span>
                        <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
                    </div>
                ) : (
                    <>
                        <Link to='/login'>로그인</Link>
                        <Link to='/login/agreement'>회원가입</Link>
                    </>
                )}
                <Link to='/customer-services'>고객센터</Link>
            </div>
        </div>
    );
};

export default TopMenu;
