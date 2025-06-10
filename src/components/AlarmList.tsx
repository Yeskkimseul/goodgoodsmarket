import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AlarmList.module.css";

interface AlarmListProps {
    leftContent: React.ReactNode;
    title: string;
    to: string;
    imgSrc?: string;
    imgAlt?: string;
    date?: React.ReactNode;
    read?: boolean;
    onClick?: () => void; // onClick prop 추가
}

const AlarmList: React.FC<AlarmListProps> = ({ leftContent, title, to, imgSrc, imgAlt, date, read, onClick }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div onClick={onClick || handleClick} className={styles.listwrap}>
            <div className={styles.left}>
                <div className={styles.img}>
                    <img
                        src={imgSrc}
                        alt={imgAlt}
                        className={styles.icon}
                    />
                    {!read && <span className={styles.badge} />}
                </div>{/* //.img */}
                <div className={styles.txt}>
                    <div className={`subtit2 ${read ? styles.read : ""}`}>
                        {title}
                    </div>
                    <div className={`body2 ${read ? styles.read : ""}`}>{leftContent}</div>
                </div>{/* //.txt */}
            </div>{/* //.left */}
            <div className={styles.right}>
                {date}
            </div>{/* //.right */}
        </div>
    );
};


export default AlarmList;