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

    return (
        <div className={`${styles.card} ${className ?? ''}`}> {/* classname이 없을 경우 빈 문자열로 대체해 undefind 방지 */}
            <Link to={`/community/commudetail/${item.id}`} className={styles.link}>
                <div className={styles.cardLeft}>
                    <span className={`caption ${styles.categoryBox}`}
                    >{item.category}
                    </span>
                    <h4 className={styles.title}>{item.title}</h4>
                    <p className={styles.userName}>{item.userName}</p>
                    <ul className={styles.underline}>
                        <li className={styles.commuRate}>
                            <img src="../images/icon/eye_small.svg" alt="작은눈"
                                className={styles.commuListIcon}
                            />
                            <span  className={styles.commuRateText}>{item.views}</span>
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
                            <span  className={styles.commuRateText}>
                                {item.commentsNum}
                            </span>
                        </li>
                    </ul>
                </div>
                <img src={item.imageUrl} alt={item.title} className={styles.image} />
            </Link >
        </div >
    );
}

export default CommuCard;