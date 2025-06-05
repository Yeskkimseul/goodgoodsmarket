import React, { useState } from 'react';
import styles from './Header.module.css';
import { useNavigate, Link } from 'react-router-dom';

interface HeaderProps {
  type?: string;
  onMoreClick?: () => void;  // 더보기 클릭 이벤트 콜백 추가
}

const HeaderType5: React.FC<HeaderProps> = ({ type, onMoreClick }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <header className={styles.header}>
      <ul className={styles.icon}>
        <li onClick={handleBack} style={{ cursor: 'pointer', justifyContent: 'center' }}>
          <img src="/images/header/header_back.svg" alt="뒤로가기" />
        </li>
        <li className={styles.avatar}>
          <img src="/images/header/header_avatars.svg" alt="프로필사진" />
          <h3>키링은 못참지</h3>
        </li>
      </ul>
      {/* onMoreClick props를 이용해서 더보기 클릭 이벤트 전달 */}
      <div onClick={onMoreClick} style={{ cursor: 'pointer' }}>
        <img src="/images/header/header_more.svg" alt="더보기" />
      </div>
    </header>
  );
};

export default HeaderType5;