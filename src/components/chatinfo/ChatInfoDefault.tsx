import { useRef, useState, useEffect } from 'react';
import styles from './ChatInfo.module.css';
import type { Chatting } from "../../types/chatting";

interface ChatInfoDefaultProps {
    chat: Chatting;
}

function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 0부터 시작
    const day = date.getDate();
    return `${month}월 ${day}일`;
}

const ChatInfoDefault = ({ chat }: ChatInfoDefaultProps) => {

    if (!chat) return null; // chat이 없으면 아무것도 렌더링하지 않음


    const productImage = chat.productImage || "/images/sample_keyring.png";

    return (
        <div className={styles.chatInfo}>
            <div className={styles.info_right}>
                <img
                    src={productImage}
                    alt="상품 이미지"
                    className={styles.thumb}
                />
                <div className={styles.info}>
                    <div className={styles.top}>
                        <div className={styles.subtitle}>
                            {chat.type === "구매"
                                ? "판매중"
                                : chat.type === "교환"
                                    ? "교환중"
                                    : "판매중"}
                        </div>
                        <span className={styles.title}>{chat.title || ""}</span>
                    </div>
                    <div className={styles.price}>{chat.price || ""}</div>
                </div>
            </div>
            <span className={styles.time}>{getTimeAgo(chat.createdAt)}</span>
        </div>
    );
};

export default ChatInfoDefault;