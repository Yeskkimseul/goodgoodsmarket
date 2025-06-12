import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import MultiTab from "../components/exchangebuy/MultiTab";
import GoodsCard from "../components/GoodsCard";
import { useGoods } from "../context/GoodsContext";
import { Goods } from "../types";

const Liked = () => {
    const navigate = useNavigate();
    const { goodsList } = useGoods();
    const [recentViewed, setRecentViewed] = useState<Goods[]>([]);

    useEffect(() => {
        const ids = JSON.parse(localStorage.getItem('recentViewed') || '[]');
        // 최근 본 상품 id 순서대로 goodsList에서 찾아서 배열로 만듦
        const recent = ids
            .map((id: string) => goodsList.find(item => item.id === id))
            .filter(Boolean) as Goods[];
        setRecentViewed(recent);
    }, [goodsList]);

    const { setGoodsList } = useGoods();

    // likes 상태 관리
    const [likedIds, setLikedIds] = useState<string[]>([]);

    useEffect(() => {
        const liked = localStorage.getItem('likes');
        if (liked) setLikedIds(JSON.parse(liked));
    }, []);

    return (
        <Layout>
            <Header type="type1" title="관심목록" />
            <MultiTab tabs={['최근 본 상품', '교환', '구매']}>
                {(activeIndex) => (
                    activeIndex === 0 ? (
                        <div>              {recentViewed.length === 0 ? (
                            <div>최근 본 상품이 없습니다.</div>
                        ) : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
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
                    ) : activeIndex === 1 ? (
                        <div>교환 탭 내용</div>
                    ) : activeIndex === 2 ? (
                        <div>구매 탭 내용</div>
                    ) : null
                )}
            </MultiTab>
        </Layout>
    )
}
export default Liked;