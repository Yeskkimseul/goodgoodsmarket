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
                    사기를 예방하기 위해, 거래 전, 더치트에서 계좌번호를 조회해보세요. <br />
                    의심 계좌일 경우 거래를 멈추는 것이 안전합니다.
                </p>
                <a href="https://thecheat.co.kr/rb/?mod=_search" className={styles.theCheat} target="_blank" rel="noreferrer">더치트에서 조회하기</a>
            </div>
            {chats.map((chat, index) => {
                const currentDate = formatDateOnly(chat.createdAt);
                const prevDate = index === 0 ? null : formatDateOnly(chats[index - 1].createdAt);
                const showDate = currentDate !== prevDate;

                return (
                    <div className={styles.chatMsg} key={chat.id + chat.createdAt}>
                        {showDate && (
                            <div className={styles.chatDay}>
                                <div className={styles.line}></div>
                                <div className={styles.time}>{currentDate}</div>
                                <div className={styles.line}></div>
                            </div>
                        )}

                        {/* 내가 보낸 메시지 */}
                        {chat.sender === "me" && chat.userMessage && (
                            <div className={styles.meChat}>
                                <div className={`body2 ${styles.meMessage}`}>
                                    <p>{chat.userMessage}</p>
                                    <span className={`caption ${styles.chatTime}`}>
                                        {formatTimeOnly(chat.createdAt)}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* 상대방 메시지 */}
                        {chat.sender !== "me" && chat.message && (
                            <div className={styles.otherChat}>
                                <img className={styles.chatProfile} src={chat.userProfile} alt="프로필" />
                                <div className={styles.otherMessage}>
                                    <div className={`body2 ${styles.chatMessage}`}>{chat.message}</div>
                                    <span className={`caption ${styles.chatTime}`}>
                                        {formatTimeOnly(chat.createdAt)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

        </div>
    );
}

export default ChatMessages;
