import { createContext, useContext, useEffect, useState } from "react";
import type { Chatting, ChatMessage } from "../types/chatting"; // ✅ 여기도 수정
import { Message } from "../types/message";

interface ChatContextType {
  chatList: Chatting[];
  addChat: (chat: Chatting) => void;
  getChatByProductId: (title: string) => Chatting | undefined;
  getChatById: (id: number) => Chatting | undefined;
  getMessagesBychatId: (chatId: number) => Message[];
  addMessage: (chatId: number, message: Message) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("ChatContext는 ChatProvider 안에서 사용되어야 합니다.");
  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatList, setChatList] = useState<Chatting[]>([]);

  /*   useEffect(() => {
      const stored = localStorage.getItem("chatRooms");
      if (stored) setChatList(JSON.parse(stored));
    }, []); */
  /*  useEffect(() => {
     const stored = localStorage.getItem("chatRooms");
     if (stored) {
       setChatList(JSON.parse(stored));
     } else {
       fetch("/data/chatting.json")
         .then((res) => res.json())
         .then((data) => {
           localStorage.setItem("chatRooms", JSON.stringify(data));
           setChatList(data); // 바로 context 상태로 반영
         })
         .catch((err) => console.error("chatting.json fetch 실패", err));
     }
   }, []); */

  useEffect(() => {
    const stored = localStorage.getItem("chatRooms");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          console.log("[✅ localStorage 로드됨]:", parsed);
          setChatList(parsed);
        } else {
          console.warn("[❌ chatRooms 타입 문제]:", parsed);
        }
      } catch (err) {
        console.error("❌ chatRooms 파싱 실패:", err);
      }
    } else {
      fetch("/data/chatting.json")
        .then((res) => res.json())
        .then((data) => {
          console.log("[📦 chatting.json 로드됨]:", data);
          localStorage.setItem("chatRooms", JSON.stringify(data));
          setChatList(data);
        })
        .catch((err) => console.error("chatting.json fetch 실패", err));
    }
  }, []);

  const addChat = (chat: Chatting) => {
    setChatList(prev => {
      const updated = [...prev, chat];
      localStorage.setItem("chatRooms", JSON.stringify(updated));

      // ✅ 메시지 초기화
      // localStorage.setItem(`chatMessages_${chat.chatId}`, JSON.stringify([]));
      return updated;
    });
  };

  const getChatByProductId = (title: string) => {
    return chatList.find(chat => chat.title === title);
  };

  const getChatById = (id: number): Chatting | undefined => {
    const fromContext = chatList.find(chat => chat.chatId === id);
    if (fromContext) return fromContext;

    // localStorage fallback
    const fromLocal = JSON.parse(localStorage.getItem("chatRooms") || "[]");
    return fromLocal.find((chat: any) => chat.chatId === id);
  };

  const getMessagesBychatId = (chatId: number): Message[] => {
    const stored = localStorage.getItem(`chatMessages_${chatId}`);
    return stored ? JSON.parse(stored) as Message[] : [];
  };

  const addMessage = (chatId: number, message: Message) => {
    const currentMessages = getMessagesBychatId(chatId);
    const updatedMessages = [...currentMessages, message];
    localStorage.setItem(`chatMessages_${chatId}`, JSON.stringify(updatedMessages));

    // 최신 메시지 요약도 chatList에 반영
    setChatList(prev => {
      const updated = prev.map(chat => {
        if (chat.chatId === chatId) {
          return {
            ...chat,
            message: message.sender === "other" ? message.content : chat.messages,
            userMessage: message.sender === "me" ? message.content : chat.messages,
            createdAt: message.createdAt,
            unread: message.sender === "other",
          };
        }
        return chat;
      });
      localStorage.setItem("chatRooms", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        chatList,
        addChat,
        getChatByProductId,
        getChatById,
        getMessagesBychatId,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};