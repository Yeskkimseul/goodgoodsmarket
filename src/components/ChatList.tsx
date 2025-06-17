import React, { useEffect, useState } from "react";
import styles from "./ChatList.module.css";
import type { Chatting } from "../types/chatting";

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
    }
    onChatClick(id);
  };

  useEffect(() => {
    const ids = chats.map(c => c.chatId);
    const unique = new Set(ids);
    if (unique.size !== ids.length) {
      console.warn("❗ 중복 있음!", ids);
    }
  }, [chats]);

  return (
    <div className={styles.chatList}>
      <ul className={styles.chatItems}>
        {chats.map((chat) => {
          const lastMessage = chat.messages.length > 0
            ? chat.messages[chat.messages.length - 1].message
            : "대화를 시작해보세요";

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
                    className={
                      readList[chat.chatId] ? styles.chatDotRead : styles.chatDot
                    }
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
                      {chat.createdAt ? getTimeAgo(chat.createdAt) : "방금 전"}
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
