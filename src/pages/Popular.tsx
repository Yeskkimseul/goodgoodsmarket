import { useEffect, useState } from "react";
import { Goods } from "../types";
import GoodsCard from "../components/GoodsCard";
import Layout from "../components/Layout";
import styles from "./CardListLayout.module.css"
import HeaderType5 from "../components/header/HeaderType5";
import ChatBottomSheet from "../components/bottomsheet/ChatBottomSheet";
import CommuBottomSheet from "../components/bottomsheet/CommuBottomSheet";
import MyListBottomSheet from "../components/bottomsheet/MyListBottomSheet";

const Popular = () => {
    const [goodsList, setGoodsList] = useState<Goods[]>([]);
    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const openSheet = () => setIsSheetOpen(true);
    const closeSheet = () => setIsSheetOpen(false);

    useEffect(() => {
        const stored = localStorage.getItem('goodsList');
        const liked = localStorage.getItem('likes');
        if (stored) {
            const list: Goods[] = JSON.parse(stored);
            setGoodsList([...list].sort((a, b) => b.likes - a.likes));
        }
        if (liked) {
            setLikedIds(JSON.parse(liked));
        }
    }, [])

    return (
        <Layout>
       {/*      <MyListBottomSheet isOpen={isSheetOpen} onClose={closeSheet}  /> */}
            {/* 여기서 onMoreClick에 openSheet 함수 전달 */}
            <HeaderType5 onMoreClick={openSheet} />
            <h2 style={{ marginBlock: 20 }}>인기 굿즈 순</h2>
            <div className={styles.list}>
                {goodsList.map((item) => (
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
            {/*             <ChatBottomSheet isOpen={isSheetOpen} onClose={closeSheet} /> */}
        </Layout>
    )
}
export default Popular;