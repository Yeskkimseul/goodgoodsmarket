import React from 'react';
import styles from './Header.module.css';
import { useNavigate, Link } from 'react-router-dom';


const HeaderType5: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // ← 바로 이전 페이지로 이동
    };

    return (
        <header className={styles.header}>
            <ul className={styles.icon} onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
                <li><img src="/images/header/header_back.svg" alt="뒤로가기" /></li>
                <li>
                    <img src="/images/header/header_avatars.svg" alt="프로필사진" />
                    <p>키링은 못참지</p>
                </li>
            </ul>
            <Link to="/mypage">
                <div className={styles.icon}>
                    <img src="/images/header/header_more.svg" alt="더보기" />
                </div>
            </Link>
        </header>
    );
};

export default HeaderType5;