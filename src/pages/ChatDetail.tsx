import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout2 from "../components/Layout2";
import HeaderType5 from "../components/header/HeaderType5";
import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet";
import ChatInput from "../components/ChatInput";
import ChatInfo from "../components/chatinfo/ChatInfo";
import ChatMessages from "../components/ChatMessages";
import type { Chatting } from "../types/chatting";
import styles from "./ChatDetail.module.css";

function ChatDetail() {
  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatList, setChatList] = useState<Chatting[]>([]);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const { id } = useParams();
  const chatId = Number(id);  // number로 변환
  const chat = chatList.find(c => String(c.id) === String(id));

  useEffect(() => {
    fetch("/data/chatting.json")
      .then(res => res.json())
      .then((data: Chatting[]) => {
        // id가 일치하는 채팅만 저장
        const filtered = data.filter(chat => chat.id === chatId);
        setChatList(filtered);
      });
  }, [chatId]);

  // chatList 배열에 type이 "판매"인 데이터가 하나라도 있으면 seller, 아니면 default
  const chatInfoType = chatList.some(chat => chat.type === "판매") ? "seller" : "default";

  return (
    <Layout2>
      <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
      <div className={styles.chatContents}>
        <div className={styles.chatTitle}>
          <HeaderType5 chat={chat} onMoreClick={openSheet} />
          <ChatInfo type={chatInfoType} chat={chatList[0]} />
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