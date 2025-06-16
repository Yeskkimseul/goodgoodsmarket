import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import ChatList from "../components/ChatList";
import styles from "./filter.module.css";
import type { Chatting } from "../types/chatting";
import { useNavigate } from "react-router-dom";

const filterList = [
  { label: "전체", value: "전체" },
  { label: "판매", value: "판매" },
  { label: "구매", value: "구매" },
  { label: "교환", value: "교환" },
] as const;

type TabType = (typeof filterList)[number]["value"];

const Chat = () => {
  const [chatData, setChatData] = useState<Chatting[]>([]);
  const [filter, setFilter] = useState<TabType>("전체");
  const navigate = useNavigate();

  // 데이터 불러오기
  useEffect(() => {
    fetch("/data/chatting.json")
      .then((res) => res.json())
      .then((data) => setChatData(data as Chatting[]))
      .catch((err) => console.error("chatting.json fetch 실패", err));
  }, []);

  // 필터 적용
  const filteredChats =
    filter === "전체" ? chatData : chatData.filter((chat) => chat.type === filter);

  const handleChatClick = (chatId: number) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <Layout>
      <Header type="type6" />
      <div>
        <div className={styles.filterContainer}>
          {filterList.map(({ label, value }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`${styles.filterButton} ${
                filter === value ? styles.active : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <ChatList
          chats={filteredChats}
          onChatClick={handleChatClick}
        />
      </div>
    </Layout>
  );
};

export default Chat;
