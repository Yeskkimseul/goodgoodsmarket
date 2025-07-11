import React, { useState } from "react";
import { SheetItem } from "./types"; // SheetItem 타입 임포트
import BottomSheet from "./BottomSheet";
import BottomSheetList from "./BottomSheetList";
import Modal from "../Modal";
import { useNavigate } from "react-router-dom";

interface MyListBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    onEdit: () => void; 
}

const MyListBottomSheet = ({ isOpen, onClose, onDelete, onEdit }: MyListBottomSheetProps) => {
    const navigate = useNavigate();
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    const items: SheetItem[] = [
        {
            label: "수정하기",
            icon: <img src="/images/bottomsheet/bs_pen.svg" alt="수정" />,
               onClick: () => {
                onEdit();
                onClose();
            },
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
                    게시글을 삭제하면<br />
                    되돌릴 수 없어요.
                </>}
                confirmText="삭제하기"
                onConfirm={() => {
                    onDelete();
                    setDeleteModalOpen(false);
                    onClose();
                }}
                onCancel={() => setDeleteModalOpen(false)}
            />
        </>
    );
};

export default MyListBottomSheet;