import { useState, useEffect } from "react";
import Layout2 from "../components/Layout2";
import HeaderType5 from "../components/header/HeaderType5";
/* import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet"; */
import ChatInput from "../components/ChatInput";
import ChatMessages from "../components/ChatMessages";
import type { Chatting } from "../types/chatting";

function ChatDetail() {
    const [msg, setMsg] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openSheet = () => setIsSheetOpen(true);
    const closeSheet = () => setIsSheetOpen(false);

    useEffect(() => {
        fetch("/data/chatting.json")
            .then(res => res.json())
            .then((data: Chatting[]) => setChatList(data.length > 0 ? [data[0]] : [])) // 첫 번째 채팅만 표시;
    }, []);

    const [chatList, setChatList] = useState<Chatting[]>([]);


    return (
        <Layout2>
            <HeaderType5 onMoreClick={openSheet} />
            <div>
                <ChatMessages chats={chatList} />
                <ChatInput
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    onSend={() => {
                        // 예시: 메시지 전송
                        alert(msg);
                        setMsg(""); // 전송 후 입력창 비우기
                    }}
                />
            </div>
        </Layout2>
    );
}

export default ChatDetail;
