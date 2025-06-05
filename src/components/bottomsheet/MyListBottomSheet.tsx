import React from "react";
import { SheetItem } from "./types"; // SheetItem 타입 임포트
import BottomSheet from "./BottomSheet";
import BottomSheetList from "./BottomSheetList";
import { useNavigate } from "react-router-dom";

interface MyListBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const MyListBottomSheet = ({ isOpen, onClose }: MyListBottomSheetProps) => {
    const navigate = useNavigate();

    const items: SheetItem[] = [
        {
            label: "수정하기",
            icon: <img src="/images/bottomsheet/bs_pen.svg" alt="수정" />,
            onClick: () => navigate("#"),
        },
        {
            label: "삭제하기",
            icon: <img src="/images/bottomsheet/bs_trash.svg" alt="삭제" />,
            onClick: () => alert("삭제 모달 오픈"),
        },
    ];

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <BottomSheetList items={items} onItemClick={onClose} />
        </BottomSheet>
    );
};

export default MyListBottomSheet;