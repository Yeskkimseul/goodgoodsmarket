import React, { useState } from "react";
import style from "./ReviewCard.module.css";
import { Review } from "../types/reivew";
import { Link } from "react-router-dom";

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    const [recommended, setRecommended] = useState(false);
    const [recommendCount, setRecommendCount] = useState(review.recommend);

    const handleRecommend = () => {
        if (!recommended) {
            setRecommendCount(count => count + 1);
        } else {
            setRecommendCount(count => count - 1);
        }
        setRecommended(prev => !prev);
    };

    // 날짜 포맷 함수 추가
    function formatDate(dateStr: string) {
        const date = new Date(dateStr);
        const yy = String(date.getFullYear()).slice(2);
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yy}.${mm}.${dd}`;
    }

    return (
        <div className={style.card}>
            <div className={style.header}>
                <div className={style.userprofile}>
                    <img src={review.reviewer.img} alt={review.reviewer.name} className={style.avatar} />
                    <span className={style.name}>{review.reviewer.name}</span>
                </div>{/* userprofile */}
                <span className={style.date}>{formatDate(review.date)}</span>
            </div>
            {/* reviewimg 배열이 있을 때만 이미지 리스트 출력 */}
            {review.reviewimg && review.reviewimg.length > 0 && (
                <div className={style.reviewimgList}>
                    {review.reviewimg.map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`리뷰이미지${idx + 1}`}
                            className={style.reviewimg}
                        />
                    ))}
                </div>
            )}
            {/* content가 있을 때만 출력 */}
            {review.content && (
                <div className={style.content}>
                    {review.content}
                </div>
            )}
            <div className={style.keywords}>
                {review.keywords.map((kw, idx) => (
                    <span key={idx} className={style.keyword}>{kw}</span>
                ))}
            </div>
            <div className={style.goods}>
                <Link to={`/home/goodsdetail/${review.goods.id}`} className={style.goodsLink}>
                    <img src={review.goods.imageUrl} alt={review.goods.title} className={style.goodsImg} />
                    <div className={style.titlecon}>
                        <span className={style.goodsTitle}>{review.goods.title}</span>
                        <img src="/images/icon/chevron-right_mint.svg" className={style.icon} />
                    </div>
                </Link>
            </div>
            <div className={style.recommendaria}>
                <div
                    className={`${style.recommend} ${recommended ? style.recommended : ""}`}
                    onClick={handleRecommend}
                >
                    <img
                        src={recommended ? "/images/icon/recommend_on_24.svg" : "/images/icon/recommend_off_24.svg"}
                        className={style.sm_icon}
                        alt="추천"
                    />
                    <span className={style.recommendText}>{recommendCount}</span>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;