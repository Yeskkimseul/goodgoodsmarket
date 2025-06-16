import { createContext, useContext, useState } from "react";
import type { Chatting } from "../types/chatting"; // 너가 제공한 구조

interface ChatContextType {
  chatList: Chatting[];
  setChatList: React.Dispatch<React.SetStateAction<Chatting[]>>;
  addChat: (chat: Chatting) => void;
  addMessage: (id: number, msg: { sender: string; content: string; createdAt: string }) => void;
  getChatByProductId: (title: string) => Chatting | undefined;
}

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat은 반드시 ChatProvider 안에서 사용해야 합니다.");
  }
  return context;
};

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatList, setChatList] = useState<Chatting[]>([]);

  // ✅ 새 채팅 추가
  const addChat = (chat: Chatting) => {
    setChatList(prev => [...prev, chat]);
  };

  // ✅ 메시지 추가 (채팅 기록 남기기)
  const addMessage = (
    id: number,
    msg: { sender: string; content: string; createdAt: string }
  ) => {
    setChatList(prev =>
      prev.map(chat =>
        chat.id === id
          ? {
              ...chat,
              sender: msg.sender,
              message: msg.sender === "me" ? "" : msg.content,
              userMessage: msg.sender === "me" ? msg.content : "",
              createdAt: msg.createdAt,
              unread: msg.sender !== "me", // 내가 보낸 건 읽음 처리
            }
          : chat
      )
    );
  };

  // ✅ 상품 제목 기준으로 기존 채팅 찾기 (중복 방지용)
  const getChatByProductId = (title: string) => {
    return chatList.find(chat => chat.title === title);
  };

  return (
    <ChatContext.Provider
      value={{
        chatList,
        setChatList,
        addChat,
        addMessage,
        getChatByProductId,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
