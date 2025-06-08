import { Commu } from "../types/commu";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './CommuCard.module.css';
import exp from "constants";
import MyListBottomSheet from "./bottomsheet/MyListBottomSheet";

//props 타입 정리 (받을 데이터들)
interface MyCommentItemProps {
    item: Commu;
    comment: {
        id: string;
        userimgUrl: string;
        userName: string;
        content: string;
        createdAt: string;
    };
    onDelete: (commentId: string) => void;
}

// 날짜 포맷 함수 추가
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}. ${mm}. ${dd}`;
};


const MyCommentItem = ({ item, comment, onDelete }: MyCommentItemProps) => {

    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const handleMoreClick = (e: React.MouseEvent) => {
        e.preventDefault(); // 링크 이동 방지
        e.stopPropagation(); // 부모 클릭 방지
        setIsSheetOpen(true);
    };

    return (
        <div className={styles.card}>
            <Link to={`/community/commudetail/${item.id}`} className={styles.link}>
                <div className={styles.cardLeft}>
                    <div className={styles.top}>
                        <h4 className={styles.category}>{item.category}</h4>
                        <p className={styles.tit}>{item.title}</p>
                    </div>
                    <h4 className={styles.title}>{comment.content}</h4>
                    <p className={styles.date} style={{ marginBottom: '0' }}>{formatDate(comment.createdAt)}</p>
                </div>
                <img src="../images/icon/more_vertical.svg" alt="더보기" className={styles.commuIcon} onClick={handleMoreClick} />
            </Link >
            <MyListBottomSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                 onDelete={() => { onDelete(comment.id); setIsSheetOpen(false); }}
            />
        </div >
    );
}

export default MyCommentItem;