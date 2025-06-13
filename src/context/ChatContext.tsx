import { createContext, useContext, useState } from "react";
import type { Chatting } from "../types/chatting"; // 채팅 데이터 타입

interface ChatContextType {
  chatList: Chatting[];
  setChatList: React.Dispatch<React.SetStateAction<Chatting[]>>;
}

// 1. Context 생성
const ChatContext = createContext<ChatContextType | null>(null);

// 2. Context 사용 훅
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat은 반드시 ChatProvider 안에서 사용해야 합니다.");
  }
  return context;
};

// 3. Provider 컴포넌트
export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatList, setChatList] = useState<Chatting[]>([]);

  return (
    <ChatContext.Provider value={{ chatList, setChatList }}>
      {children}
    </ChatContext.Provider>
  );
};
