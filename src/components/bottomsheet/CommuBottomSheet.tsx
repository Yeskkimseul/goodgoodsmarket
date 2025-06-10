import React, { useState } from "react";
import { SheetItem } from "./types"; // SheetItem 타입 임포트
import BottomSheet from "./BottomSheet";
import BottomSheetList from "./BottomSheetList";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

interface CommuBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const CommuBottomSheet = ({ isOpen, onClose }: CommuBottomSheetProps) => {
    const navigate = useNavigate();
    const [isBlockModalOpen, setBlockModalOpen] = useState(false);

    const items: SheetItem[] = [
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
    ];

    return (
        <>
            <BottomSheet isOpen={isOpen} onClose={onClose}>
                <BottomSheetList items={items} onItemClick={onClose} />
            </BottomSheet>

            <Modal
                isOpen={isBlockModalOpen}
                title="00 님을 차단하시겠습니까?"
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
        </>
    );
};

export default CommuBottomSheet;