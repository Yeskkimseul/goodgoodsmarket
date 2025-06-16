import React, { useState } from 'react';
import styles from './Header.module.css';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { Chatting } from '../../types/chatting';

interface HeaderProps {
  chat: Chatting | undefined;
  onMoreClick?: () => void;  // 더보기 클릭 이벤트 콜백 추가
}

const HeaderType5: React.FC<HeaderProps> = ({ chat, onMoreClick }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };


  return (
    <header className={styles.header}>
      <ul className={styles.type5}>
        <li onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }} className={styles.back}>
          <img src="/images/header/header_back.svg" alt="뒤로가기" />
        </li>
        <li className={styles.avatar}>
          <img 
          className={styles.userProfile}
          src={chat?.userProfile}
          alt="프로필사진" />
          <h3>{chat?.username}</h3>
        </li>
      </ul>
      {/* onMoreClick props를 이용해서 더보기 클릭 이벤트 전달 */}
      <div onClick={onMoreClick} className={styles.icon} style={{ cursor: 'pointer' }}>
        <img src="/images/header/header_more.svg" alt="더보기" />
      </div>
    </header>
  );
};

export default HeaderType5;