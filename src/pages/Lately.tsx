import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import MultiTab from "../components/exchangebuy/MultiTab";
import GoodsCard from "../components/GoodsCard";
import { useGoods } from "../context/GoodsContext";
import { Goods } from "../types";
import styles from "../components/exchangebuy/Tab.module.css"


const Lately = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const initialTab = location.state?.tab ?? 0;
    const [tabIndex, setTabIndex] = useState(initialTab);

    const { goodsList } = useGoods();
    const [recentViewed, setRecentViewed] = useState<Goods[]>([]);

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem('recentViewed') || '[]');
        // 최근 본 상품 id 순서대로 goodsList에서 찾아서 배열로 만듦
        const recent = ids
            .map((id: string) => goodsList.find((item: Goods) => item.id === id))
            .filter((item: Goods | undefined): item is Goods => {
                return !!item && item.sellerName !== "뱃지가좋아";
            });

        setRecentViewed(recent);
    }, [goodsList]);

    const { setGoodsList } = useGoods();

    // likes 상태 관리
    const [likedIds, setLikedIds] = useState<string[]>(() => {
        const liked = localStorage.getItem('likes');
        return liked ? JSON.parse(liked) : [];
    });

    useEffect(() => {
        localStorage.setItem('likes', JSON.stringify(likedIds));
    }, [likedIds]);

    return (
        <Layout>
            <Header type="type1" title="최근 본 상품" />
            <div>
                {recentViewed.length === 0 ? (
                    <div className={styles.cate}>최근 본 상품이 없습니다.</div>
                ) : (
                    <div className={styles.cate}>
                        {recentViewed.map(item => (
                            <GoodsCard
                                key={item.id}
                                item={item}
                                likedIds={likedIds}
                                setLikedIds={setLikedIds}
                                goodsList={goodsList}
                                setGoodsList={setGoodsList} />
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    )
}
export default Lately;