import style from "./ReviewCard.module.css";
import { Review } from "../types/reivew";
import { Link } from "react-router-dom";

interface ReviewCardProps {
    review: Review;
}

const ReviewCard = ({ review }: ReviewCardProps) => {
    return (
        <div className={style.card}>
            <div className={style.header}>
                <img src={review.reviewer.img} alt={review.reviewer.name} className={style.avatar} />
                <span className={style.name}>{review.reviewer.name}</span>
                <span className={style.date}>{review.date}</span>
            </div>
            <div className={style.keywords}>
                {review.keywords.map((kw, idx) => (
                    <span key={idx} className={style.keyword}>{kw}</span>
                ))}
            </div>
            <div className={style.goods}>
                <Link to={`/goods/${review.goods.id}`} className={style.goodsLink}>
                    <img src={review.goods.imageUrl} alt={review.goods.title} className={style.goodsImg} />
                    <span className={style.goodsTitle}>{review.goods.title}</span>
                </Link>
                <div className={style.recommend}>추천수: {review.recommend}</div>
            </div>
        </div>
    );
};

export default ReviewCard;