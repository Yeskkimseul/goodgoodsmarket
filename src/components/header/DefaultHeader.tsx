import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';


const DefaultHeader: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src="/images/header/logo.svg" alt="굿굿마켓" />
                </Link>
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