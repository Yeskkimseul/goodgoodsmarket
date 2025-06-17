import { Commu } from "../types/commu";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './CommuCard.module.css';
import exp from "constants";

//props 타입 정리 (받을 데이터들)
interface Props {
    item: Commu;
    category?: string; //카테고리 선택시 사용
    className?: string; //?를 붙여 클래스를 문자열로 받아도 되고 아니어도 됨'
}

const CommuCard = ({ item, className }: Props) => {

    // localStorage에서 값 불러오기
    const commuLikes = JSON.parse(localStorage.getItem("commuLikes") || "{}");
    const commuViews = JSON.parse(localStorage.getItem("commuViews") || "{}");
    const raw = localStorage.getItem('comments');
    const storedComments = raw ? JSON.parse(raw) : {};

    const likes = commuLikes[item.id] ?? item.likes;
    const views = commuViews[item.id] ?? item.views;

    // localStorage에 저장된 댓글이 있으면 그 길이, 없으면 원본 comments 배열 길이
    const commentList = storedComments?.[item.id];
    const commentsNum = Array.isArray(commentList)
        ? commentList.length
        : Array.isArray(item.comments)
            ? item.comments.length
            : 0;



    return (
        <div className={`${styles.card} ${className ?? ''}`}> {/* classname이 없을 경우 빈 문자열로 대체해 undefind 방지 */}
            <Link to={`/community/commudetail/${item.id}`} className={styles.link}>
                <div className={styles.cardLeft}>
                    <span className={`caption ${styles.categoryBox}`}
                    >{item.category}
                    </span>
                    <h3 className={styles.title}>{item.title}</h3>
                    <p className={styles.userName}>{item.userName}</p>
                    <ul className={styles.underline}>
                        <li className={styles.commuRate}>
                            <img src="../images/icon/eye_small.svg" alt="작은눈"
                                className={styles.commuListIcon}
                            />
                            <span className={styles.commuRateText}>{views}</span>
                        </li>
                        <li className={styles.commuRate}>
                            <img src="../images/icon/heart_small.svg" alt="
                            작은좋아요"
                                className={styles.commuListIcon}
                            />
                            <span className={styles.commuRateText}>{likes}</span>

                        </li>
                        <li className={styles.commuRate}>
                            <img src="../images/icon/comment_small.svg" alt="
                            작은댓글"
                                className={styles.commuListIcon}
                            />
                            <span className={styles.commuRateText}>{commentsNum}</span>
                        </li>
                    </ul>
                </div>
                {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className={styles.image} />
                )}
            </Link >
        </div >
    );
}

export default CommuCard;