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
}

const AlarmList: React.FC<AlarmListProps> = ({ leftContent, title, to, imgSrc, imgAlt, date }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <div onClick={handleClick} className={styles.listwrap}>
            <div className={styles.left}>
                <img
                    src={imgSrc}
                    alt={imgAlt}
                    className={styles.icon}
                />
                <div className={styles.txt}>
                    <div className="subtit2">
                        {title}
                    </div>
                    <div className='body2'>{leftContent}</div>
                </div>{/* //.txt */}
            </div>{/* //.left */}
            <div className={styles.right}>
                {date}
            </div>{/* //.right */}
        </div>
    );
};


export default AlarmList;