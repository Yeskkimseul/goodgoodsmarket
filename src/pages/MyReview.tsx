import Layout from "../components/Layout";
import { useEffect, useState, useRef } from "react";
import Header from "../components/header/Header";
import Trust from "../components/Trust";
import ReviewCard from "../components/ReviewCard";
import { useReview } from "../context/ReviewContext";
import style from "./GoodsDetail.module.css"
import { Goods } from "../types";


const MyReview = () => {
    const { reviews } = useReview();
    const myReviews = reviews.filter(r => r.sellerName === "뱃지가좋아");

    const [goods] = useState<Goods | null>(null);

    return (
        <Layout>
            <Header type='type1' title='내 상점후기' />
            <div className={style.tabcon2}>
                <Trust trust={goods ? goods.sellerTrust : 70} />
                <div className={style.blank}></div>
                <div className={style.reviewsinner}>
                    {myReviews.map(review => (
                        <ReviewCard
                            key={review.id}
                            review={review}
                        />
                    ))}
                </div>
            </div>
        </Layout>
    )
}
export default MyReview;