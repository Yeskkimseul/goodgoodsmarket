import { useState } from "react";
import Layout from "../components/Layout";
import HeaderType5 from "../components/header/HeaderType5";
import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet";

const ChatDetail = () => {

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openSheet = () => setIsSheetOpen(true);
    const closeSheet = () => setIsSheetOpen(false);

    return (
        <Layout>
            <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} />
            <HeaderType5 onMoreClick={openSheet} />
            <div>
                채팅디테일
            </div>
        </Layout>
    )

}

export default ChatDetail;