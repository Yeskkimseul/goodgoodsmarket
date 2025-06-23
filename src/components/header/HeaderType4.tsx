import React from 'react';
import styles from './Header.module.css';
import { useNavigate, Link } from 'react-router-dom';


const HeaderType4: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
    const navigate = useNavigate();
    const handleBack = () => { navigate(-1); };
    return (
        <header className={styles.header}>
            <div className={styles.back} onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
                <img src="/images/header/header_back.svg" alt="뒤로가기" />
            </div>
            <h3>프로필 관리</h3>
            <div className={styles.done} onClick={onComplete}>완료</div>
        </header>
    );
};
export default HeaderType4;