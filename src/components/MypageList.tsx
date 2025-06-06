import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MypageList.module.css";

interface MypageListProps {
    leftContent: React.ReactNode;
    to: string;
}

const MypageList: React.FC<MypageListProps> = ({ leftContent, to }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div
            onClick={handleClick}
            className={styles.mypageList}>
            <div className='body2'>{leftContent}</div>
            <img src="/images/mypage/rightarrow.svg" alt="가기" className={styles.icon}/>
        </div>
    );
};


export default MypageList;