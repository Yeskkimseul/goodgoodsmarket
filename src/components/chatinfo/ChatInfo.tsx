import { useParams } from "react-router-dom";
import ChatInfoDefault from "./ChatInfoDefault";
import ChatInfoSeller from "./ChatInfoSeller";
import type { Chatting } from "../../types/chatting";

export type ChatInfoType = 'default' | 'seller';

interface ChatInfoProps {
  type: ChatInfoType;
  chat: Chatting;
}



const ChatInfo = ({ type, chat }: ChatInfoProps) => {
  switch (type) {
    case 'default': 
      return <ChatInfoDefault chat={chat} />;
    case 'seller':
      return <ChatInfoSeller  chat={chat} />;
    default:
      return <ChatInfoDefault chat={chat} />; // fallback
  }
};

export default ChatInfo;
