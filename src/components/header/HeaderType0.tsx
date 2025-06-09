import React from 'react';
import styles from './Header.module.css';
import formstyle from '../../pages/form.module.css';
import { useNavigate } from 'react-router-dom';

interface DefaultHeaderProps {
    title: string;
}

const HeaderType0: React.FC = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // ← 바로 이전 페이지로 이동
    };

    return (
        <header className={styles.header}>
            <div className={styles.search}>
                <div className={styles.icon} onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
                    <img src="/images/header/header_back.svg" alt="뒤로가기" />
                </div>
                <input className={formstyle.input}
                    type='text'
                    placeholder='검색어를 입력해주세요'
                />
            </div>
        </header>
    );
};

export default HeaderType0;