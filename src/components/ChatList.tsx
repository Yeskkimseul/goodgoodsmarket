import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.css";
import type { Chat, ChatType } from "../types/chatting";

const tabList = ["전체", "판매", "구매", "교환"] as const;
type TabType = typeof tabList[number];

function getTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

const ChatList = () => {
  const [activeTab, setActiveTab] = useState<TabType>("전체");
  const [chatData, setChatData] = useState<Chat[]>([]);

  useEffect(() => {
    fetch("/data/chatting.json")
      .then((res) => res.json())
      .then((data) => setChatData(data as Chat[]))
      .catch((err) => console.error("chatting.json fetch 실패", err));
  }, []);

  const filteredChats =
    activeTab === "전체"
      ? chatData
      : chatData.filter((chat) => chat.type === activeTab);

  return (
    <div className={styles.chatList}>
      <div className={styles.chatTabs}>
        {tabList.map((tab) => (
          <button
            key={tab}
            className={`${styles.chatTab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <ul className={styles.chatItems}>
        {filteredChats.map((chat) => (
          <li key={chat.id} className={styles.chatItem}>
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
                    className={styles.userAvatar}
                  />
                  <span className={styles.username}>{chat.username}</span>
                </div>
                <span className={styles.chatTime}>
                  {getTimeAgo(chat.createdAt)}
                </span>
              </div>
              <div className={styles.chatMessage}>{chat.message}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
