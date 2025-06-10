import React, { useState } from 'react';
import styles from './ToggleButton.module.css'; // CSS 모듈 import

type ToggleButtonProps = {
  text: string;
  onSelect: (text: string, selected: boolean) => void;
};

const ToggleButton: React.FC<ToggleButtonProps> = ({ text, onSelect }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    const newState = !selected;
    setSelected(newState);
    onSelect(text, newState);
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