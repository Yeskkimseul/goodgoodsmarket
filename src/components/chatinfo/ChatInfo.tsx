import ChatInfoDefault from "./ChatInfoDefault";
import ChatInfoSeller from "./ChatInfoSeller";

type ChatInfoType = 'default' | 'seller';

interface ChatInfoProps {
  type: ChatInfoType;
}

const ChatInfo = ({ type }: ChatInfoProps) => {
  switch (type) {
    case 'default':
      return <ChatInfoDefault />;
    case 'seller':
      return <ChatInfoSeller />;
    default:
      return <ChatInfoDefault />; // fallback
  }
};

export default ChatInfo;
