import React, { useState } from "react";
import { SheetItem } from "./types"; // SheetItem 타입 임포트
import BottomSheet from "./BottomSheet";
import BottomSheetList from "./BottomSheetList";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

interface ChatBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const ChatBottomSheet = ({ isOpen, onClose }: ChatBottomSheetProps) => {
    const navigate = useNavigate();
    const [isBlockModalOpen, setBlockModalOpen] = useState(false);
    const [isLeaveModalOpen, setLeaveModalOpen] = useState(false);

    const items: SheetItem[] = [
        {
            label: "후기 작성하기",
            icon: <img src="/images/bottomsheet/bs_pen.svg" alt="후기" />,
            onClick: () => navigate("#"),
        },
        {
            label: "알람끄기",
            icon: <img src="/images/bottomsheet/bs_belloff.svg" alt="알림끄기" />,
            onClick: () => { },
        },
        {
            label: "차단하기",
            icon: <img src="/images/bottomsheet/bs_block.svg" alt="차단" />,
            onClick: () => setBlockModalOpen(true),
        },
        {
            label: "신고하기",
            icon: <img src="/images/bottomsheet/bs_report.svg" alt="신고" />,
            onClick: () => navigate("#"),
        },
        {
            label: "채팅방 나가기",
            icon: <img src="/images/bottomsheet/bs_out.svg" alt="나가기" />,
            onClick: () => setLeaveModalOpen(true),
            color: "var(--text-error)",
        },
    ];

    return (
        <>
            <BottomSheet isOpen={isOpen} onClose={onClose}>
                <BottomSheetList items={items} onItemClick={onClose} />
            </BottomSheet>

            <Modal
                isOpen={isBlockModalOpen}
                title="키링은 못참지 님을 차단하시겠습니까?"
                description={<>
                    차단 후, 상대의 게시글 조회와 채팅이<br />
                    불가능합니다.
                </>}
                confirmText="차단하기"
                onConfirm={() => {
                    console.log("차단 완료!");/* 일단 콘솔로... */
                    setBlockModalOpen(false);
                    onClose();
                }}
                onCancel={() => setBlockModalOpen(false)}
            />
            <Modal
                isOpen={isLeaveModalOpen}
                title="채팅방을 나가시겠습니까?"
                description="채팅 목록 및 대화 내용이 삭제됩니다."
                confirmText="채팅방 나가기"
                onConfirm={() => {
                    navigate("/chat");/* 일단 콘솔로... */
                    setLeaveModalOpen(false);
                    onClose();
                }}
                onCancel={() => setLeaveModalOpen(false)}
            />
        </>
    );
};

export default ChatBottomSheet;