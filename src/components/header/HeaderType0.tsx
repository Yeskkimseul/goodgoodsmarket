import React, { useState } from 'react';
import styles from './Header.module.css';
import formstyle from '../../pages/form.module.css';
import { useNavigate } from 'react-router-dom';

const suggestions = ['굿즈', '문구', '솜깅','스탠드', '아크릴', '앨범', '음반', '응원봉', '인형', '잡지', '커스텀', '코롯토', '키링', '티켓', '패션', '팬라이트', '펜', '포카', '포토카드'];

const HeaderType0: React.FC = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length > 0) {
      const filtered = suggestions.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
  };

  return (
    <header className={styles.header}>
      <div className={styles.search}>
        <div
          className={styles.icon}
          onClick={handleBack}
          style={{ cursor: 'pointer', justifyContent: 'center' }}
        >
          <img src="/images/header/header_back.svg" alt="뒤로가기" />
        </div>
        <div style={{ position: 'relative', width: '100%' }}>
          <input
            className={`${formstyle.input} ${styles.searchInput}`}
            type="text"
            placeholder="검색어를 입력해주세요"
            value={inputValue}
            onChange={handleChange}
          />
          {filteredSuggestions.length > 0 && (
            <ul className={styles.suggestionList}>
              {filteredSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className={styles.suggestionItem}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderType0;