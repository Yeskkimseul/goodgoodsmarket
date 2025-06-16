import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MypageList.module.css";

interface MypageListProps {
    leftContent: React.ReactNode;
    to?: string;
    onClick?: () => void;
    showArrow?: boolean;
    showToggle?: boolean;
    toggleValue?: boolean;
    onToggleChange?: (checked: boolean) => void;
}

const MypageList: React.FC<MypageListProps> = ({
    leftContent,
    to,
    onClick,
    showArrow = true,
    showToggle = false,
    toggleValue = false,
    onToggleChange
}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (to) {
            navigate(to);
        }
    };

    return (
        <div
            onClick={showArrow !== false ? handleClick : undefined}
            className={styles.mypageList}
            style={showArrow === false ? { pointerEvents: "none" } : undefined}>
            <div className='body2'>{leftContent}</div>
            {showToggle && (
                <label className={styles.toggleSwitch}>
                    <input
                        type="checkbox"
                        checked={toggleValue}
                        onChange={e => onToggleChange?.(e.target.checked)}
                        onClick={e => e.stopPropagation()} // 클릭이 부모로 전파되지 않게
                        className={styles.toggle}
                    />
                    <span className={styles.slider}></span>
                </label>
            )}
            {showArrow && !showToggle && (
                <img src="/images/mypage/rightarrow.svg" alt="가기" className={styles.icon} />
            )}
        </div>
    );
};

export default MypageList;