import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from "../../redux/store/store";
import {logoutState, setUsernameFromLocalStorageState} from '../../redux/auth/authSlice';
import styles from './TopMenu.module.css';

const TopMenu = () => {
    const dispatch = useDispatch<AppDispatch>();
    const username = useSelector((state: RootState) => state.auth.username);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setUsernameFromLocalStorageState());
    }, [dispatch]);

    const handleLogout = async () => {
        dispatch(logoutState());
        navigate('/'); // 로그아웃 후 리디렉션할 경로
    };

    return (
        <div className={styles.container}>
            <div className={styles.links}>
                {username ? (
                    <div className={styles.userInfo}>
                        <span className={styles.name}>{username}님</span>
                        <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
                    </div>
                ) : (
                    <>
                        <Link to='/login'>로그인</Link>
                        <Link to='/login/agreement'>회원가입</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default TopMenu;
