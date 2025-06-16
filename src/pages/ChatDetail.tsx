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
  const { id } = useParams();
  const navigate = useNavigate();
  const chatId = Number(id);

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
      unread: false,
      title: chatMeta?.title || "",
      price: chatMeta?.price || "",
      productImage: chatMeta?.productImage || "",
      username: "나",
      userProfile: "/images/myprofile.png",
      type: "판매",
    };

    const updated = [...chatList, newMessage];
    setChatList(updated);

    const stored = localStorage.getItem("chatRooms");
    const chatRooms = stored ? JSON.parse(stored) : [];

    const existingRoomIndex = chatRooms.findIndex((room: any) => room.roomId === id);

    if (existingRoomIndex > -1) {
      chatRooms[existingRoomIndex].messages = updated;
    } else {
      const newRoom = {
        roomId: id,
        title: chatMeta?.title || "신규 채팅방",
        price: chatMeta?.price || "",
        productImage: chatMeta?.productImage || "",
        sellerName: chatMeta?.sellerName || "판매자",
        sellerProfile: chatMeta?.sellerProfile || "/images/default.png",
        type: chatMeta?.type || "판매",
        messages: updated,
      };
      chatRooms.push(newRoom);
    }

    localStorage.setItem("chatRooms", JSON.stringify(chatRooms));
  };

  // 📥 데이터 로딩 (수정된 부분만)
  useEffect(() => {
  const stored = localStorage.getItem("chatRooms");
  const chatRooms = stored ? JSON.parse(stored) : [];

  const localRoom = chatRooms.find((room: any) => room.roomId === id);

  if (localRoom) {
    setChatList(localRoom.messages || []);
    setChatMeta(localRoom);
  } else {
    fetch("/data/chatting.json")
      .then(res => res.json())
      .then((data: Chatting[]) => {
        const filtered = data
          .filter(chat => chat.id === chatId)
          .flatMap(chat => {
            const list: Chatting[] = [];

            if (chat.userMessage) {
              list.push({
                ...chat,
                sender: "me",
                message: "",
              });
            }

            if (chat.message) {
              list.push({
                ...chat,
                sender: "you",
                userMessage: "",
              });
            }

            return list;
          });

        setChatList(filtered);

        const newRoom = {
          roomId: id,
          title: filtered[0]?.title || "신규 채팅방",
          price: filtered[0]?.price || "",
          productImage: filtered[0]?.productImage || "",
          sellerName: filtered[0]?.username || "판매자",
          sellerProfile: filtered[0]?.userProfile || "/images/default.png",
          type: filtered[0]?.type || "판매",
          messages: filtered,
        };

        const updatedRooms = [...chatRooms, newRoom];
        setChatMeta(newRoom);
        localStorage.setItem("chatRooms", JSON.stringify(updatedRooms));
      });
  }
}, [id]);



  const chatInfoType = chatList.some(chat => chat.type === "판매") ? "seller" : "default";

  return (
    <Layout2>
      <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
      <div className={styles.chatContents}>
        <div className={styles.chatTitle}>
          <HeaderType5
            chat={{
              id: 0,
              message: "",
              userMessage: "",
              sender: "you",
              unread: false,
              username: chatMeta?.sellerName || "판매자",
              userProfile: chatMeta?.sellerProfile || "/images/default.png",
              title: chatMeta?.title || "",
              productImage: chatMeta?.productImage || "",
              price: chatMeta?.price || "",
              createdAt: chatList[0]?.createdAt || new Date().toISOString(),
              type: "판매",
            }}
            onMoreClick={openSheet}
          />
          <ChatInfo type={chatInfoType} chat={chatList[0] || chatMeta} />
          <div className={styles.chat}>
            <ChatMessages chats={chatList} />
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