import { useState, useEffect } from "react";
import Layout2 from "../components/Layout2";
import HeaderType5 from "../components/header/HeaderType5";
import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet";
import ChatInput from "../components/ChatInput";
import ChatInfo from "../components/chatinfo/ChatInfo";
import ChatMessages from "../components/ChatMessages";
import type { Chatting } from "../types/chatting";
import styles from "./ChatDetail.module.css";

function ChatDetail() {
  const [msg, setMsg] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatList, setChatList] = useState<Chatting[]>([]);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  useEffect(() => {
    fetch("/data/chatting.json")
      .then(res => res.json())
      .then((data: Chatting[]) => setChatList(data.length > 0 ? [data[0]] : []));
  }, []);

  // 👉 첫 채팅의 type이 '판매'일 경우만 seller
  const chatInfoType = chatList[0]?.type === "판매" ? "seller" : "default";

  return (
    <Layout2>
      <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
      <div className={styles.chatContents}>
        <div className={styles.chatTitle}>
          <HeaderType5 onMoreClick={openSheet} />
          <ChatInfo type={chatInfoType} />
          <div className={styles.chat}>
            <ChatMessages chats={chatList} />
          </div>
        </div>
        <ChatInput
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onSend={() => {
            alert(msg);
            setMsg("");
          }}
        />
      </div>
    </Layout2>
  );
}

export default ChatDetail;