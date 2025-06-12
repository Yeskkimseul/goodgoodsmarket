import React from "react";
import { useState, useEffect } from "react";
import styles from "./ChatList.module.css";
import type { Chatting } from "../types/chatting";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// time
function getTimeAgo(dateString: string): string {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
    return `${Math.floor(diff / 86400)}일 전`;
}

type ChatListProps = {
    chats: Chatting[];
};


const ChatList = ({ chats }: ChatListProps) => {

    const [readList, setReadList] = useState<boolean[]>(() => {
        const saved = localStorage.getItem("chatReadList");
        return saved ? JSON.parse(saved) : chats.map(chat => !chat.unread ? true : false);
    });

    const handleRead = (idx: number) => {
        setReadList(prev => prev.map((r, i) => i === idx ? true : r));
    };

    useEffect(() => {
        localStorage.setItem("chatReadList", JSON.stringify(readList));
    }, [readList]);

    const [chatStates, setChatStates] = useState(chats);

    const handleDotClick = (id: string | number) => {
        setChatStates(prev =>
            prev.map(chat =>
                chat.id === id ? { ...chat, unread: false } : chat
            )
        );
    };

    return (
        <div className={styles.chatList}>
            <ul className={styles.chatItems}>
                {chats.map((chat, idx) => (
                    <li key={chat.id} className={styles.chatItem}>
                        <Link
                            to={`/chat/chatdetail`}
                            className={styles.link}
                            onClick={() => handleRead(idx)}
                        >
                            <div className={styles.productImage}>
                                <img src={chat.productImage} alt="상품" />
                                <span
                                    className={readList[idx] ? styles.chatDotRead : styles.chatDot}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                            <div className={styles.chatContent}>
                                <div className={styles.chatHeader}>
                                    <div className={styles.userInfo}>
                                        <img
                                            src={chat.userProfile}
                                            alt={chat.username}
                                            className={styles.userProfile}
                                        />
                                        <h4 className={styles.username}>{chat.username}</h4>
                                    </div>
                                    <span className={`caption ${styles.chatTime}`}>
                                        {getTimeAgo(chat.createdAt)}
                                    </span>
                                </div>
                                <div className={`body2 ${styles.chatMessage}`}>{chat.message}</div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;