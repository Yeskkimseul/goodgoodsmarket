import React, { useEffect, useState } from "react";
import styles from "./ChatList.module.css";
import type { Chatting } from "../types/chatting";
//import { useChat } from "../context/ChatContext";

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
  onChatClick: (chatId: number) => void;
};

const ChatList = ({ chats, onChatClick }: ChatListProps) => {
  //  const { chatList } = useChat();

  const [readList, setReadList] = useState<{ [id: number]: boolean }>(() => {
    const saved = localStorage.getItem("chatReadList");
    return saved ? JSON.parse(saved) : {};
  });


  // 상태가 바뀔 때마다 저장
  useEffect(() => {
    localStorage.setItem("chatReadList", JSON.stringify(readList));
  }, [readList]);

  // 클릭 시 읽음 처리 + 상위에서 넘겨준 클릭 핸들러 실행
  const handleClick = (id: number) => {
    if (!readList[id]) {
      const updated = { ...readList, [id]: true };
      setReadList(updated);
    }
    onChatClick(id); // 상위에서 넘긴 navigate 실행됨
  };

  return (
    <div className={styles.chatList}>
      <ul className={styles.chatItems}>
        {chats.map((chat) => {
          console.log(chat.id);
          return (
            <li key={chat.id} className={styles.chatItem}
          /* onClick={() => onChatClick(chat.id)} */>
              <button
                type="button"
                className={styles.link}
                onClick={() => handleClick(chat.id)}
              >
                <div className={styles.productImage}>
                  <img src={chat.productImage || "/images/default-product.png"} alt="상품" />
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
                      {chat.createdAt ? getTimeAgo(chat.createdAt) : "방금 전"}
                    </span>
                  </div>
                  <div className={`body2 ${styles.chatMessage}`}>
                    {chat.message || "대화를 시작해보세요"}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  );
};

export default ChatList;
