import { createContext, useContext, useEffect, useState } from "react";
import type { Chatting, ChatMessage } from "../types/chatting";

interface ChatContextType {
  chatList: Chatting[];
  addChat: (chat: Chatting) => void;
  getChatByProductId: (title: string) => Chatting | undefined;
  getChatById: (id: number) => Chatting | undefined;
  getMessagesBychatId: (chatId: number) => ChatMessage[];
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

  // 로컬스토리지에서 데이터를 로드하고 없으면 기본 데이터 사용
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
      // 기본 데이터 로드 (실제 데이터로 바꾸세요)
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
      const newChat = {
        ...chat,
        messages: [], // 🔥 undefined 방지
      };
      const updated = [...prev, newChat];
      localStorage.setItem("chatRooms", JSON.stringify(updated));
      return updated;
    });
  };

  // productId로 채팅방 찾기
  const getChatByProductId = (title: string) => {
    return chatList.find(chat => chat.title === title);
  };

  // chatId로 채팅방 찾기 (context + localStorage에서)
  const getChatById = (id: number): Chatting | undefined => {
    const fromContext = chatList.find(chat => chat.chatId === id);
    if (fromContext) return fromContext;

    // localStorage fallback
    const fromLocal = JSON.parse(localStorage.getItem("chatRooms") || "[]");
    return fromLocal.find((chat: any) => chat.chatId === id);
  };

  // chatId로 메시지 목록 가져오기
  const getMessagesBychatId = (chatId: number): ChatMessage[] => {
    const stored = localStorage.getItem(`chatMessages_${chatId}`);
    return stored ? JSON.parse(stored) as ChatMessage[] : [];
  };

  // 새로운 메시지 추가
  const addMessage = (chatId: number, message: ChatMessage) => {
    const currentMessages = getMessagesBychatId(chatId);
    const updatedMessages = [...currentMessages, message];
    localStorage.setItem(`chatMessages_${chatId}`, JSON.stringify(updatedMessages));

    // 최신 메시지 요약도 chatList에 반영
    setChatList(prev => {
      const updated = prev.map(chat => {
        if (chat.chatId === chatId) {
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
        getMessagesBychatId,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
