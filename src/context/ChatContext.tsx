import { createContext, useContext, useEffect, useState } from "react";
import type { Chatting } from "../types/chatting";
import { Message } from "../types/message";

interface ChatContextType {
  chatList: Chatting[];
  addChat: (chat: Chatting) => void;
  getChatByProductId: (title: string) => Chatting | undefined;
  getChatById: (id: number) => Chatting | undefined;
  getMessagesByChatId: (chatId: number) => Message[];
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

  useEffect(() => {
    const stored = localStorage.getItem("chatRooms");
    if (stored) setChatList(JSON.parse(stored));
  }, []);

  const addChat = (chat: Chatting) => {
    setChatList(prev => {
      const updated = [...prev, chat];
      localStorage.setItem("chatRooms", JSON.stringify(updated));

      // ✅ 메시지 초기화
      localStorage.setItem(`chatMessages_${chat.id}`, JSON.stringify([]));
      return updated;
    });
  };

  const getChatByProductId = (title: string) => {
    return chatList.find(chat => chat.title === title);
  };

  const getChatById = (id: number) => {
    return chatList.find(chat => chat.id === id);
  };

  const getMessagesByChatId = (chatId: number): Message[] => {
    const stored = localStorage.getItem(`chatMessages_${chatId}`);
    return stored ? JSON.parse(stored) : [];
  };

  const addMessage = (chatId: number, message: Message) => {
    const currentMessages = getMessagesByChatId(chatId);
    const updatedMessages = [...currentMessages, message];
    localStorage.setItem(`chatMessages_${chatId}`, JSON.stringify(updatedMessages));

    // 최신 메시지 요약도 chatList에 반영
    setChatList(prev => {
      const updated = prev.map(chat => {
        if (chat.id === chatId) {
          return {
            ...chat,
            message: message.sender === "other" ? message.content : chat.message,
            userMessage: message.sender === "me" ? message.content : chat.userMessage,
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
        getMessagesByChatId,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};