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
  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage: Chatting = {
      id: Number(id),
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
      type: "판매"
    };

    const updated = [...chatList, newMessage];
    setChatList(updated);

    const chatRooms = JSON.parse(localStorage.getItem("chatRooms") || "[]");
    const updatedRooms = (chatRooms as any[]).map((room: any) =>
      room.roomId === id ? { ...room, messages: updated } : room
    );
    localStorage.setItem("chatRooms", JSON.stringify(updatedRooms));
  };

  const navigate = useNavigate();

  const [msg, setMsg] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatList, setChatList] = useState<Chatting[]>([]);

  const [chatMeta, setChatMeta] = useState<any | null>(null);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const { id } = useParams();
  const chatId = Number(id);  // number로 변환
  const chat = chatList.find(c => String(c.id) === String(id));

  useEffect(() => {
    const chatRooms = JSON.parse(localStorage.getItem("chatRooms") || "[]");
    const localRoom = chatRooms.find((room: any) => room.roomId === id);

    if (localRoom) {
      // 🔥 새로 생성된 채팅방
      setChatList(localRoom.messages || []);
      setChatMeta(localRoom);
    } else {
      // 🔁 기존 chatting.json 에서 불러오기
      fetch("/data/chatting.json")
        .then(res => res.json())
        .then((data: Chatting[]) => {
          const filtered = data.filter(chat => chat.id === Number(id));
          setChatList(filtered);
          // setChatMeta(filtered[0] || null);
        });
    }
  }, [id]);


  // chatList 배열에 type이 "판매"인 데이터가 하나라도 있으면 seller, 아니면 default
  const chatInfoType = chatList.some(chat => chat.type === "판매") ? "seller" : "default";



  return (
    <Layout2>
      <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
      <div className={styles.chatContents}>
        <div className={styles.chatTitle}>
          <HeaderType5
            /* chat={chatMeta}  */
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
            onMoreClick={openSheet} />
          <ChatInfo
            type={chatInfoType}
            chat={chatList[0] || chatMeta}
          />
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