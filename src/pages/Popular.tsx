import { useEffect,useState } from "react";
import { Goods } from "../types";
import GoodsCard from "../components/GoodsCard";
import Layout from "../components/Layout";
import styles from "./CardListLayout.module.css"
import Header from "../components/header/Header";

const Popular = () => {
    const [goodsList, setGoodsList] = useState<Goods[]>([]);
    const [likedIds, setLikedIds] =useState<string[]>([]);

    useEffect(()=>{
        const stored = localStorage.getItem('goodsList');
        const liked = localStorage.getItem('likes');
        if(stored){
            const list:Goods[] = JSON.parse(stored);
            setGoodsList([...list].sort((a,b)=> b.likes - a.likes));
        }
        if(liked){
            setLikedIds(JSON.parse(liked));
        }
    },[])
    return (
        <Layout>
            <Header type="type1" title=" "></Header>
            <h2 style={{marginBlock:20}}>인기 굿즈 순</h2>
            <div className={styles.list}>
                {goodsList.map((item) =>(
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
        </Layout>
    )
}
export default Popular;