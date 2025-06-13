import React, { useEffect, useState } from "react";
import styles from "./ChatList.module.css";
import type { Chatting } from "../types/chatting";
import { useNavigate } from "react-router-dom";

// 시간 계산 함수
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
  const [readList, setReadList] = useState<{ [id: number]: boolean }>(() => {
    const saved = localStorage.getItem("chatReadList");
    return saved ? JSON.parse(saved) : {};
  });

  const navigate = useNavigate();

  // 상태가 바뀔 때마다 저장
  useEffect(() => {
    localStorage.setItem("chatReadList", JSON.stringify(readList));
  }, [readList]);

  // 클릭 시 읽음 처리 및 페이지 이동
  const handleClick = (id: number) => {
    if (!readList[id]) {
      const updated = { ...readList, [id]: true };
      setReadList(updated);
      localStorage.setItem("chatReadList", JSON.stringify(updated));
    }
    navigate(`/chat/chatdetail`);
  };

  return (
    <div className={styles.chatList}>
      <ul className={styles.chatItems}>
        {chats.map((chat) => (
          <li key={chat.id} className={styles.chatItem}>
            <button
              type="button"
              className={styles.link}
              onClick={() => handleClick(chat.id)}
            >
              <div className={styles.productImage}>
                <img src={chat.productImage} alt="상품" />
                <span
                  className={
                    readList[chat.id] ? styles.chatDotRead : styles.chatDot
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
                    {getTimeAgo(chat.createdAt)}
                  </span>
                </div>
                <div className={`body2 ${styles.chatMessage}`}>
                  {chat.message}
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
