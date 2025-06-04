import React from 'react';
import styles from './Header.module.css';
import { useNavigate, Link } from 'react-router-dom';


const HeaderType3 = ({ onComplete }: { onComplete?: () => void }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // ← 바로 이전 페이지로 이동
    };

    return (
        <header className={styles.header}>
            <div className={styles.icon} onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
                <img src="/images/header/header_back.svg" alt="뒤로가기" />
            </div>
            <div className={`${styles.done} cusor`} onClick={onComplete}>완료</div>
        </header>
    );
};

export default HeaderType3;