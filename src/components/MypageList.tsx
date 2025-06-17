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
        if (showToggle && onToggleChange) {
            onToggleChange(!toggleValue); // ✅ 전체 영역 클릭으로도 토글 작동
        } else if (onClick) {
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
                <label
                    className={styles.toggleSwitch}
                    onClick={(e) => e.stopPropagation()} // ✅ 부모 클릭 전파 방지 (토글 클릭 시)
                >
                    <input
                        type="checkbox"
                        checked={toggleValue}
                        onChange={(e) => onToggleChange?.(e.target.checked)} // ✅ 직접 조작 허용
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