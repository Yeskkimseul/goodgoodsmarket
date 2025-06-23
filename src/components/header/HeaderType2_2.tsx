import React from 'react';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';


const HeaderType2_2: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // ← 바로 이전 페이지로 이동
    };

    return (
        <header className={styles.header}>
            <div className={styles.type2_2}>
                <div className={styles.back} onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
                    <img src="/images/header/header_back.svg" alt="뒤로가기" />
                </div>
                <div className={styles.back}>
                    <Link to="/home">
                        <img src="/images/header/header_home.svg" alt="home" />
                    </Link>
                </div>

            </div>{/* //.type2_2 */}
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
                    <Link to="/liked">
                        <img src="/images/header/header_heart.svg" alt="heart" />
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default HeaderType2_2;