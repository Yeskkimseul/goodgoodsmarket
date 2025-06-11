import React from "react";
import type { Chatting } from "../types/chatting";
import styles from "./ChatMessages.module.css";

interface ChatMessagesProps {
    chats: Chatting[];
}

function formatDateOnly(createdAt: string) {
    const dt = new Date(createdAt);
    return (
        dt.getFullYear() +
        "." +
        String(dt.getMonth() + 1).padStart(2, "0") +
        "." +
        String(dt.getDate()).padStart(2, "0")
    );
}

function formatTimeOnly(createdAt: string) {
    const dt = new Date(createdAt);
    return (
        String(dt.getHours()).padStart(2, "0") +
        ":" +
        String(dt.getMinutes()).padStart(2, "0")
    );
}

function ChatMessages({ chats }: ChatMessagesProps) {
    return (
        <div className={styles.chatMessages}>
            <div className={styles.warningMessage}>
                <p className="caption">
                    사기를 예방하기 위해, <br />
                    거래 전, 더치트에서 계좌번호를 조회해보세요. <br />
                    의심 계좌일 경우 거래를 멈추는 것이 안전합니다.
                </p>
                <a href="#" className={styles.theCheat}> 더치트에서 조회하기</a>
            </div>
            {chats.map((chat) => (
                <div className="chat-msg" key={chat.id}>
                    <div className={styles.chatTime}>
                        <div className={styles.line}></div>
                        <div className={styles.time}>{formatDateOnly(chat.createdAt)}</div>
                        <div className={styles.line}></div>
                    </div>
                    <div className="{styles.otherChat}">
                    <img className={styles.chatProfile} src={chat.userProfile} alt="프로필" />
                    </div>
                    <div className="{styles.otherMessage}">
                        <div className={styles.chatContent}>
                            <div className={`body2 ${styles.chatMessage}`}>{chat.message}</div>
                            <div className={styles.chatHeader}>
                                <span className={`caption ${styles.chatTime}`}>
                                    {formatTimeOnly(chat.createdAt)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ChatMessages;