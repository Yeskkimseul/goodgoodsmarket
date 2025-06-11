import { useState } from "react";
import Layout2 from "../components/Layout2";
import HeaderType5 from "../components/header/HeaderType5";
/* import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet"; */
import ChatInput from "../components/ChatInput";

function ChatDetail() {
    const [msg, setMsg] = useState("");
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openSheet = () => setIsSheetOpen(true);
    const closeSheet = () => setIsSheetOpen(false);

    return (
        <Layout2>

            <HeaderType5 onMoreClick={openSheet} />
            <div>

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
