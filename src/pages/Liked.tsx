import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate, useLocation } from 'react-router-dom';
import MultiTab from "../components/exchangebuy/MultiTab";
import GoodsCard from "../components/GoodsCard";
import { useGoods } from "../context/GoodsContext";
import { Goods } from "../types";



const Liked = () => {
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

    /*     useEffect(() => {
            const liked = localStorage.getItem('likes');
            if (liked) {
                setLikedIds(JSON.parse(liked));
            }
        }, []); */

    //새로고침시 최근 본 상품 목록을 불러오기



    // 교환 탭에 보여줄 데이터: isExchangeable이 true이고, likedIds에 포함된 상품만
    const exchangeLiked = goodsList.filter(
        g => g.isExchangeable && likedIds.includes(String(g.id)) && g.sellerName !== "뱃지가좋아"
    );
    console.log("goodsList", goodsList);
    console.log("likedIds", likedIds);
    // 구매 탭에 보여줄 데이터: isExchangeable이 false이고, likedIds에 포함된 상품만
    const purchaseLiked = goodsList.filter(
        g => !g.isExchangeable && likedIds.includes(String(g.id)) && g.sellerName !== "뱃지가좋아"
    );

    return (
        <Layout>
            <Header type="type1" title="관심목록" />
            <MultiTab
                tabs={['최근 본 상품', '교환', '구매']}
                activeIndex={tabIndex}
                setActiveIndex={setTabIndex}
            >
                {(activeIndex) => (
                    activeIndex === 0 ? (
                        <div style={{ marginTop: 'var(--space24)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2vw,24px)', padding: '0 var(--padding)' }}>
                            {recentViewed.length === 0 ? (
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
                        <div style={{ marginTop: 'var(--space24)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2vw,24px)', padding: '0 var(--padding)' }}>
                            {exchangeLiked.length === 0 ? (
                                <div>교환 찜 상품이 없습니다.</div>
                            ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                                    {exchangeLiked.map(item => (
                                        <GoodsCard
                                            key={item.id}
                                            item={item}
                                            likedIds={likedIds}
                                            setLikedIds={setLikedIds}
                                            goodsList={goodsList}
                                            setGoodsList={setGoodsList}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : activeIndex === 2 ? (
                        <div style={{ marginTop: 'var(--space24)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(12px,2vw,24px)', padding: '0 var(--padding)' }}>
                            {purchaseLiked.length === 0 ? (
                                <div>구매 찜 상품이 없습니다.</div>
                            ) : (
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                                    {purchaseLiked.map(item => (
                                        <GoodsCard
                                            key={item.id}
                                            item={item}
                                            likedIds={likedIds}
                                            setLikedIds={setLikedIds}
                                            goodsList={goodsList}
                                            setGoodsList={setGoodsList}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : null
                )}
            </MultiTab>
        </Layout>
    )
}
export default Liked;