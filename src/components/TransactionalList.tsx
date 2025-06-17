import React from "react";
import styles from './TransactionalList.module.css'
import style from '../pages/form.module.css'

type TradeStatus = "거래완료" | "판매완료" | "교환완료";

interface TradeCardProps {
    status: TradeStatus;
    image: string;
    title: string;
    price: number | string;
    date: string;
    button?: React.ReactNode;
}

const formatDateToKorean = (dateStr: string): string => {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr; // 유효하지 않은 날짜일 경우 그대로 출력

    const year = String(date.getFullYear()).slice(-2);
    const month = date.getMonth() + 1; // 0부터 시작하므로 +1
    const day = date.getDate();
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${year}년 ${pad(month)}월 ${pad(day)}일`;
};

const TransactionalList: React.FC<TradeCardProps> = ({
    status,
    image,
    title,
    price,
    date,
    button,
}) => {
    return (
        <div className={styles.listwrap}>
            <div className="subtit2">
                {status}
            </div>

            <div className={styles.title}>
                <img src={image} alt={title} style={{
                    width: "150px",
                    minWidth: "75px",
                   height: "150px",
                    minHeight: "75px",
                    objectFit: "cover",
                    borderRadius: "6px",
                }} />

                <div className={styles.subsub}>
                    <div className="subtit2">{title}</div>
                    <h3>{typeof price === "number" ? `${price.toLocaleString()}원` : price}</h3>
                    <div className={styles.date}>{formatDateToKorean(date)}</div>
                </div>
            </div>
            {button && (
                <div className={style.button_big}>
                    후기 남기기
                </div>
            )}
        </div>
    );
};

export default TransactionalList;