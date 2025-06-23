import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout2 from "../components/Layout2";
import HeaderType5 from "../components/header/HeaderType5";
import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet";
import ChatInput from "../components/ChatInput";
import ChatInfo from "../components/chatinfo/ChatInfo";
import type { Chatting, ChatMessage } from "../types/chatting";
import { useChat } from "../context/ChatContext";
import styles from "./ChatDetail.module.css";
import { ChatInfoType } from "../components/chatinfo/ChatInfo";




function formatDateOnly(createdAt: string) {
  const dt = new Date(createdAt);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, "0")}.${String(dt.getDate()).padStart(2, "0")}`;
}

function formatTimeOnly(timeString: string) {
  const dt = new Date(timeString);
  return `${String(dt.getHours()).padStart(2, "0")}:${String(dt.getMinutes()).padStart(2, "0")}`;
}

function ChatDetail() {
  const { id } = useParams<{ id: string }>();
  const chatId = Number(id);
  const navigate = useNavigate();
const { getChatById, addMessage } = useChat(); // ✅ addMessage도 같이 불러오기

  const [msg, setMsg] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [chatMeta, setChatMeta] = useState<Chatting | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const openSheet = () => setIsSheetOpen(true);
  const closeSheet = () => setIsSheetOpen(false);

  const sortedChats = [...chatMessages].sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      sendId: Date.now(),
      sender: "me",
      message: text,
      createdAt: new Date().toISOString(),
    };

    const updatedChat = [...chatMessages, newMessage];
    setChatMessages(updatedChat);

    const stored = localStorage.getItem("chatRooms");

    // console.log(newMessage);

    const chatRooms = stored ? JSON.parse(stored) : [];

    const updatedRooms = chatRooms.map((room: any) => {
      if (room.chatId === chatId) {
        return { ...room, messages: updatedChat };
      }
      return room;
    });

    addMessage(chatId, newMessage);

    

    localStorage.setItem("chatRooms", JSON.stringify(updatedRooms || []));
  };

  useEffect(() => {
    const chat = getChatById(chatId);
    if (chat) {
      setChatMeta(chat);
      setChatMessages(chat.messages || []);
    }
  }, [chatId]);

  if (!chatMeta) {
    // console.warn("chatMeta is null. chatId:", chatId);
    return <div className="loading">잠시만 기다려주세요...</div>;
  }

  const chatInfoType: ChatInfoType = chatMeta.chatinfotype === "seller" ? "seller" : "default";

  return (
    <Layout2>
      <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
      <div className={styles.chatContents}>
        <div className={styles.chatTitle}>
          <HeaderType5
            chat={chatMeta}
            onMoreClick={openSheet}
          />
          <ChatInfo type={chatInfoType} chat={chatMeta} />
          <div className={styles.chat}>
            <div className={styles.chatMessages}>
              <div className={styles.warningMessage}>
                <p className="caption">
                  사기를 예방하기 위해, 거래 전, 더치트에서 계좌번호를 조회해보세요. <br />
                  의심 계좌일 경우 거래를 멈추는 것이 안전합니다.
                </p>
                <a
                  href="https://thecheat.co.kr/rb/?mod=_search"
                  className={styles.theCheat}
                  target="_blank"
                  rel="noreferrer"
                >
                  더치트에서 조회하기
                </a>
              </div>
              {sortedChats.map((chat, index) => {
                const currentDate = formatDateOnly(chat.createdAt);
                const prevDate =
                  index === 0
                    ? null
                    : formatDateOnly(sortedChats[index - 1].createdAt);
                const showDate = currentDate !== prevDate;

                return (
                  <div className={styles.chatMsg} key={chat.sendId}>
                    {showDate && (
                      <div className={styles.chatDay}>
                        <div className={styles.line}></div>
                        <div className={styles.time}>{currentDate}</div>
                        <div className={styles.line}></div>
                      </div>
                    )}

                    {chat.sender === "you" ? (
                      <div className={styles.otherChat}>
                        <img className={styles.chatProfile} src={chatMeta.userProfile} alt="프로필" />
                        <div className={styles.otherMessage}>
                          <div className={`body2 ${styles.chatMessage}`}>{chat.message}</div>
                          <span className={`caption ${styles.chatTime}`}>{formatTimeOnly(chat.createdAt)}</span>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.meChat}>
                        <div className={`body2 ${styles.meMessage}`}>
                          <p>{chat.message}</p>
                          <span className={`caption ${styles.chatTime}`}>{formatTimeOnly(chat.createdAt)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
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