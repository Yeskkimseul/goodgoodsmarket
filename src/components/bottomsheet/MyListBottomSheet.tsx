import React, { useState } from "react";
import { SheetItem } from "./types"; // SheetItem 타입 임포트
import BottomSheet from "./BottomSheet";
import BottomSheetList from "./BottomSheetList";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

interface MyListBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const MyListBottomSheet = ({ isOpen, onClose }: MyListBottomSheetProps) => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const items: SheetItem[] = [
        {
            label: "수정하기",
            icon: <img src="/images/bottomsheet/bs_pen.svg" alt="수정" />,
            onClick: () => navigate("#"),
        },
        {
            label: "삭제하기",
            icon: <img src="/images/bottomsheet/bs_trash.svg" alt="삭제" />,
            onClick: () => setDeleteModalOpen(true),
            color: "var(--text-error)",
        },
    ];

    return (
        <>
            <BottomSheet isOpen={isOpen} onClose={onClose}>
                <BottomSheetList items={items} onItemClick={onClose} />
            </BottomSheet>

            <Modal
                isOpen={isDeleteModalOpen}
                title="정말 삭제할까요?"
                description={<>
                    채팅이 있는 게시글을 삭제하면<br />
                    거래 상대방이 당황할 수 있어요.
                </>}
                confirmText="삭제하기"
                onConfirm={() => {
                    console.log("삭제 완료!");/* 일단 콘솔로... */
                    setDeleteModalOpen(false);
                    onClose();
                }}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </>
    );
};

export default MyListBottomSheet;