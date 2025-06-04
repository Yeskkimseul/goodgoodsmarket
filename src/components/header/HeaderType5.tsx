import React from 'react';
import styles from './Header.module.css';


const HeaderType5: React.FC = () => {
    return (
        <header className="header">
            <div className="logo"><a href="/"><img src="/images/header/logo.svg" alt="굿굿마켓" /></a></div>
            <ul className='right'>
                <li><a href="/"><img src="/images/header/" alt="" /></a></li>
                <li><a href="/"></a></li>
                <li><a href="/"></a></li>
            </ul>
        </header>
    );
};

export default HeaderType5;