import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';


const DefaultHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // ← 바로 이전 페이지로 이동
    };

    return (
        <header className={styles.header}>
            <div className={styles.icon} onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
                <img src="/images/header/header_back.svg" alt="뒤로가기" />
            </div>
            <ul className={styles.right}>
                <li>
                    <Link to="/home/search">
                        <img src="/images/header/header_search.svg" alt="search" />
                    </Link>
                </li>
                <li>
                    <Link to="/mypage/alarm">
                        <img src="/images/header/header_bell.svg" alt="bell" />
                    </Link>

                </li>
                <li>
                    <Link to="/Liked">
                        <img src="/images/header/header_heart.svg" alt="bell" />
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default DefaultHeader;