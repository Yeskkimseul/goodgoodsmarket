import React, { useEffect, useState } from "react";
import styles from "./ChatList.module.css";
import type { Chatting } from "../types/chatting";
import { useChat } from "../context/ChatContext";

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
  onChatClick: (chatId: number) => void;
};

const ChatList = ({ chats, onChatClick }: ChatListProps) => {
  const [readList, setReadList] = useState<{ [id: number]: boolean }>(() => {
    const saved = localStorage.getItem("chatReadList");
    return saved ? JSON.parse(saved) : {};
  });

  const handleClick = (id: number) => {
    if (!readList[id]) {
      const updated = { ...readList, [id]: true };
      setReadList(updated);
      localStorage.setItem("chatReadList", JSON.stringify(updated));
    }
    onChatClick(id);
  };

  // 🔽 최신 메시지 기준으로 정렬
  const sortedChats = [...chats].sort((a, b) => {
    const aTime = a.messages.length > 0
      ? new Date(a.messages[a.messages.length - 1].createdAt).getTime()
      : new Date(a.createdAt).getTime();

    const bTime = b.messages.length > 0
      ? new Date(b.messages[b.messages.length - 1].createdAt).getTime()
      : new Date(b.createdAt).getTime();

    return bTime - aTime; // 내림차순
  });

  return (
    <div className={styles.chatList}>
      <ul className={styles.chatItems}>
        {sortedChats.map((chat) => {
          const hasMessages = chat.messages.length > 0;
          const lastMessageObj = hasMessages
            ? chat.messages[chat.messages.length - 1]
            : null;

          const lastMessage = lastMessageObj?.message || "대화를 시작해보세요";
          const lastTime = lastMessageObj?.createdAt || chat.createdAt;

          return (
            <li key={chat.chatId} className={styles.chatItem}>
              <button
                type="button"
                className={styles.link}
                onClick={() => handleClick(chat.chatId)}
              >
                <div className={styles.productImage}>
                  <img src={chat.productImage || "/images/default-product.png"} alt="상품" />
                  <span
                    className={readList[chat.chatId] ? styles.chatDotRead : styles.chatDot}
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
                      {getTimeAgo(lastTime)}
                    </span>
                  </div>
                  <div className={`body2 ${styles.chatMessage}`}>
                    {lastMessage}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


export default ChatList;
