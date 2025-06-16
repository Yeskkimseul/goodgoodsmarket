import React from 'react';
import styles from './Header.module.css';
import { useNavigate, Link } from 'react-router-dom';

const HeaderType6: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/home");
    };

    return (
        <header className={styles.header}>
            <div className={styles.logo} onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
                <img src="/images/header/logo.svg" alt="굿굿마켓" />
            </div>
        </header>
    );
};

export default HeaderType6;