import { Commu } from "../types/commu";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './CommuCard.module.css';
import exp from "constants";
import MyListBottomSheet from "./bottomsheet/MyListBottomSheet";

//props 타입 정리 (받을 데이터들)
interface Props {
    item: Commu;
    category?: string; //카테고리 선택시 사용
    className?: string; //?를 붙여 클래스를 문자열로 받아도 되고 아니어도 됨'
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


const MycommuItem = ({ item, className, onDelete }: Props & { onDelete: (id: string) => void }) => {

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const navigate = useNavigate();

    const handleMoreClick = (e: React.MouseEvent) => {
        e.preventDefault(); // 링크 이동 방지
        e.stopPropagation(); // 부모 클릭 방지
        setIsSheetOpen(true);
    };

    return (
        <div className={`${styles.card} ${className ?? ''}`}> {/* classname이 없을 경우 빈 문자열로 대체해 undefind 방지 */}
            <Link to={`/community/commudetail/${item.id}`} className={styles.link}>
                <div className={styles.cardLeft}>
                    <span className={`caption ${styles.categoryBoxColor}`}
                    >{item.category}
                    </span>
                    <h4 className={styles.title}>{item.title}</h4>
                    <p className={styles.date}>{formatDate(item.createdAt)}</p>
                    <ul className={styles.underline}>
                        <li className={styles.commuRate}>
                            <img src="../images/icon/eye_small.svg" alt="작은눈"
                                className={styles.commuListIcon}
                            />
                            <span className={styles.commuRateText}>{item.views}</span>
                        </li>
                        <li className={styles.commuRate}>
                            <img src="../images/icon/heart_small.svg" alt="
                            작은좋아요"
                                className={styles.commuListIcon}
                            />
                            <span
                                className={styles.commuRateText}
                            > {item.likes}</span>

                        </li>
                        <li className={styles.commuRate}>
                            <img src="../images/icon/comment_small.svg" alt="
                            작은댓글"
                                className={styles.commuListIcon}
                            />
                            <span className={styles.commuRateText}>
                                {item.commentsNum}
                            </span>
                        </li>
                    </ul>
                </div>
                <img src="../images/icon/more_vertical.svg" alt="더보기" className={styles.commuIcon} onClick={handleMoreClick} />
            </Link >
            <MyListBottomSheet
                isOpen={isSheetOpen}
                onClose={() => setIsSheetOpen(false)}
                onDelete={() => { onDelete(item.id); setIsSheetOpen(false); }}
                onEdit={() => navigate(`/community/commuedit/${item.id}`)}
            />
        </div >
    );
}

export default MycommuItem;