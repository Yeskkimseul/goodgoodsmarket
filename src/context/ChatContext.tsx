import { createContext, useContext, useEffect, useState } from "react";
import type { Chatting, ChatMessage } from "../types/chatting";

interface ChatContextType {
  chatList: Chatting[];
  addChat: (chat: Chatting) => void;
  getChatByProductId: (title: string) => Chatting | undefined;
  getChatById: (id: number) => Chatting | undefined;
  addMessage: (chatId: number, message: ChatMessage) => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) throw new Error("ChatContext는 ChatProvider 안에서 사용되어야 합니다.");
  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatList, setChatList] = useState<Chatting[]>([]);

  // 로컬스토리지 데이터 로드
  useEffect(() => {
    const stored = localStorage.getItem("chatRooms");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          // console.log("[✅ localStorage 로드됨]:", parsed);
          setChatList(parsed);
        } else {
          console.warn("[❌ chatRooms 타입 문제]:", parsed);
        }
      } catch (err) {
        console.error("❌ chatRooms 파싱 실패:", err);
      }
    } else {
      // 최초 데이터 로드
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

  // 새로운 채팅방 추가
  const addChat = (chat: Chatting) => {
    setChatList(prev => {
      const newChat = { ...chat, messages: [] };
      const updated = [...prev, newChat];
      localStorage.setItem("chatRooms", JSON.stringify(updated));
      return updated;
    });
  };

  // productId로 채팅방 찾기
  const getChatByProductId = (title: string) => {
    return chatList.find(chat => chat.title === title);
  };

  // chatId로 채팅방 찾기
  const getChatById = (id: number): Chatting | undefined => {
    return chatList.find(chat => chat.chatId === id);
  };

  // 새로운 메시지 추가
  const addMessage = (chatId: number, message: ChatMessage) => {
    setChatList(prev => {
      const updated = prev.map(chat => {
        if (chat.chatId === chatId) {
          const updatedMessages = [...chat.messages, message];
          return {
            ...chat,
            messages: updatedMessages,
            createdAt: message.createdAt,
            unread: message.sender === "you",
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
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
