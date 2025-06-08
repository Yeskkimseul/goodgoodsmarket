import { Goods } from "../types";
import styles from "./MyDealItem.module.css"
import React from "react";
import { Link } from "react-router-dom";
import forms from "../pages/form.module.css";

interface Props {
    item: Goods;
    className?: string; //?를 붙여 클래스를 문자열로 받아도 되고 아니어도 됨
}

// 날짜 포맷 함수 추가
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};

const MyDealItem = ({ item, className }: Props) => {


    return (
        <div className={`${styles.card} ${className ?? ''}`}> {/* classname이 없을 경우 빈 문자열로 대체해 undefind 방지 */}
            <div className={styles.cardLeft}>
                <img src={item.imageUrl} alt={item.title} className={styles.image} />
            </div>
            <div className={styles.cardright}>
                <div className={styles.righttop}>
                    <div className={styles.title}>{item.title}</div>
                    <div className={styles.price}>
                        {item.isExchangeable
                            ? '교환 희망 제품'
                            : (item.price ?? 0).toLocaleString() + '원'}
                    </div>
                </div>
                <div className={styles.date_like}>
                    <span className="caption">
                        {formatDate(item.createdAt)}
                    </span>
                    <div className={styles.heart}>
                        <img src="/images/icon/heart_small.svg" alt="찜개수" />
                        {item.likes}
                    </div>
                </div>
                <div className={styles.btns}>
                    <button className={forms.button_sm} style={{ backgroundColor: 'var(--bg-lightE)', color: 'var(--text-grey)' }}>
                        삭제하기
                    </button>
                    <button className={forms.button_sm}>
                        수정하기
                    </button>
                </div>
            </div>
        </div>
    )
};

export default MyDealItem;