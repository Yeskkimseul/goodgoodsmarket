import React from "react";
import styles from "./ChatList.module.css";
import type { Chatting } from "../types/chatting";
import { Link } from "react-router-dom";

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
    return (
        <div className={styles.chatList}>
            <ul className={styles.chatItems}>
                {chats.map((chat) => (
                    <li key={chat.id} className={styles.chatItem}>
                        <Link to={`/chat/chatdetail`} className={styles.link}>
                            <div className={styles.productImage}>
                                <img src={chat.productImage} alt="상품" />
                                {chat.unread && <span className={styles.chatDot} />}
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
