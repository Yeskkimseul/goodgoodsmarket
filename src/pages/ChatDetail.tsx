import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout2 from "../components/Layout2";
import HeaderType5 from "../components/header/HeaderType5";
import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet";
import ChatInput from "../components/ChatInput";
import ChatInfo from "../components/chatinfo/ChatInfo";
import type { Chatting } from "../types/chatting";
import { useChat } from "../context/ChatContext";
import styles from "./ChatDetail.module.css";
import { ChatInfoType } from "../components/chatinfo/ChatInfo";

function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const chatId = Number(id);
  const navigate = useNavigate();

  const { getMessagesByChatId, addMessage, getChatById } = useChat();

  const [msg, setMsg] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatList, setChatList] = useState<Chatting[]>([]);
  const [chatMeta, setChatMeta] = useState<any | null>(null);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Chatting = {
      id: Date.now(),
      message: "",
      userMessage: text,
      sender: "me",
      createdAt: new Date().toISOString(),
      messageSentAt: new Date().toISOString(),
      userMessageSentAt: new Date().toISOString(),
      unread: false,
      title: chatMeta?.title || "",
      price: chatMeta?.price || "",
      productImage: chatMeta?.productImage || "",
      username: "나",
      userProfile: "/images/myprofile.png",
      type: chatMeta?.type || "판매",
    };

    const updatedList = [...chatList, newMessage];
    setChatList(updatedList);

    // 💾 localStorage에도 저장
    const stored = localStorage.getItem("chatRooms");
    const chatRooms = stored ? JSON.parse(stored) : [];

    const updatedRooms = chatRooms.map((room: any) => {
      if (room.roomId === id) {
        return { ...room, messages: updatedList };
      }
      return room;
    });

    localStorage.setItem("chatRooms", JSON.stringify(updatedRooms));
  };

  // 📥 첫 로딩: localStorage → 없으면 json fetch
 

  // 🔄 chatMeta fallback (useChat context or chatList)
  useEffect(() => {
    const fallback = chatList.find(c => c.id === chatId);
    const chat = getChatById(chatId) || fallback;
    setChatMeta(chat || null);
  }, [chatId, chatList]);

  if (!chatMeta) return null;

  const chatInfoType: ChatInfoType = chatMeta.chatinfotype === "seller" ? "seller" : "default";

  return (
    <Layout2>
      <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
      <div className={styles.chatContents}>
        <div className={styles.chatTitle}>
          <HeaderType5
            chat={{
              id: chatId,
              message: "",
              userMessage: "",
              sender: "you",
              unread: false,
              username: chatMeta.username || "판매자",
              userProfile: chatMeta.userProfile || "/images/default.png",
              title: chatMeta.title || "신규 채팅방",
              productImage: chatMeta.productImage || "/images/default-product.png",
              price: chatMeta.price || "",
              createdAt: chatMeta.createdAt || new Date().toISOString(),
              type: chatMeta.type || "판매",
            }}
            onMoreClick={openSheet}
          />
          <ChatInfo type={chatInfoType} chat={chatMeta} />
          <div className={styles.chat}>
          </div>
        </div>
        <ChatInput
          value={msg}
          onChange={e => setMsg(e.target.value)}
          onSend={() => {
            handleSend(msg);
            setMsg("");
          }}
        />
      </div>
    </Layout2>
  );
}

export default ChatDetail;
