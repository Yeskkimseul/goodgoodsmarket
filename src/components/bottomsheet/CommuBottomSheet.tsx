import React from "react";
import { SheetItem } from "./types"; // SheetItem 타입 임포트
import BottomSheet from "./BottomSheet";
import BottomSheetList from "./BottomSheetList";
import { useNavigate } from "react-router-dom";

interface CommuBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const CommuBottomSheet = ({ isOpen, onClose }: CommuBottomSheetProps) => {
    const navigate = useNavigate();

    const items: SheetItem[] = [
        {
            label: "후기 작성하기",
            icon: <img src="/images/bottomsheet/bs_pen.svg" alt="후기" />,
            onClick: () => navigate("/writereview"),
        },
        {
            label: "알람끄기",
            icon: <img src="/images/bottomsheet/bs_belloff.svg" alt="알림끄기" />,
            onClick: () => { },
        },
        {
            label: "차단하기",
            icon: <img src="/images/bottomsheet/bs_block.svg" alt="차단" />,
            onClick: () => alert("차단 모달 오픈"),
        },
        {
            label: "신고하기",
            icon: <img src="/images/bottomsheet/bs_report.svg" alt="신고" />,
            onClick: () => navigate("#"),
        },
        {
            label: "채팅방 나가기",
            icon: <img src="/images/bottomsheet/bs_out.svg" alt="나가기" />,
            onClick: () => alert("모달 오픈"),
        },
    ];

    return (
        <BottomSheet isOpen={isOpen} onClose={onClose}>
            <BottomSheetList items={items} onItemClick={onClose} />
        </BottomSheet>
    );
};

export default CommuBottomSheet;