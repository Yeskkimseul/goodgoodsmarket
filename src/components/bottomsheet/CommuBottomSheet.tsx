import React, { useState } from "react";
import { SheetItem } from "./types"; // SheetItem 타입 임포트
import BottomSheet from "./BottomSheet";
import BottomSheetList from "./BottomSheetList";
import Modal from "../Modal";
import { useNavigate, useLocation } from "react-router-dom";

interface CommuBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    userName: string;
}

const CommuBottomSheet = ({ isOpen, onClose, userName }: CommuBottomSheetProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isBlockModalOpen, setBlockModalOpen] = useState(false);

    const id = location.pathname.split("/").pop();

    const handleBlock = () => {
        fetch("/data/commu.json")
            .then(res => res.json())
            .then((data: any[]) => {
                const target = data.find(item => item.id === id);
                if (!target) {
                    alert("차단할 사용자를 찾을 수 없습니다.");
                    setBlockModalOpen(false);
                    onClose();
                    return;
                }
                const blockedUser = target.userName;

                // 차단된 유저 목록에 추가
                const blockedUsers = JSON.parse(localStorage.getItem("blockedUsers") || "[]");
                if (!blockedUsers.includes(blockedUser)) {
                    blockedUsers.push(blockedUser);
                    localStorage.setItem("blockedUsers", JSON.stringify(blockedUsers));
                }

                alert("차단이 완료되었습니다.");
                setBlockModalOpen(false);
                onClose();
                navigate(-1);
            });
    };

    const handleReport = () => {
        alert("신고가 완료되었습니다.");
        onClose();
    };

    const items: SheetItem[] = [
        {
            label: "차단하기",
            icon: <img src="/images/bottomsheet/bs_block.svg" alt="차단" />,
            onClick: () => setBlockModalOpen(true),
        },
        {
            label: "신고하기",
            icon: <img src="/images/bottomsheet/bs_report.svg" alt="신고" />,
            onClick: handleReport,
        },
    ];

    return (
        <>
            <BottomSheet isOpen={isOpen} onClose={onClose}>
                <BottomSheetList items={items} onItemClick={onClose} />
            </BottomSheet>

            <Modal
                isOpen={isBlockModalOpen}
                title={`${userName} 님을 차단하시겠습니까?`}
                description={<>차단 후, 상대의 게시글 조회와 채팅이<br />불가능합니다.</>}
                confirmText="차단하기"
                onConfirm={handleBlock}
                onCancel={() => setBlockModalOpen(false)}
            />
        </>
    );
};

export default CommuBottomSheet;