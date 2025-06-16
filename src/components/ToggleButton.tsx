import React from 'react';
import styles from './ToggleButton.module.css';

type ToggleButtonProps = {
  text: string;
  selected: boolean;
  onSelect: (text: string, selected: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ text, selected, onSelect }) => {
  const handleClick = () => {
    onSelect(text, !selected); // 상태 변경은 부모가 처리
  };

  return (
    <div
      onClick={handleClick}
      className={`${styles.button} ${selected ? styles.selected : ''}`}
    >
      {text}
    </div>
  );
};

export default ToggleButton;