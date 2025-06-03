import { Goods } from "../types";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './GoodsCard.module.css';


//props 타입 정리 (받을 데이터들)
interface Props {
    item: Goods;
    likedIds: string[];
    setLikedIds: React.Dispatch<React.SetStateAction<string[]>>
    //타입 스테이트에서 상태 업데이트 설명
    goodsList: Goods[];
    setGoodsList: React.Dispatch<React.SetStateAction<Goods[]>>
    className?: string; //?를 붙여 클래스를 문자열로 받아도 되고 아니어도 됨
}

const GoodsCard = ({ item, likedIds, setLikedIds, goodsList, setGoodsList, className }: Props) => {
    const [liked, setliked] = useState(false); //내가 아이템을 찜했는지

    //처음 들어오거나 likedIds가 바뀌면 liked 상태 업데이트
    useEffect(() => {
        setliked(likedIds.includes(item.id));
    }, [likedIds, item.id])

    const toggleLike = () => {
        const liked = likedIds.includes(item.id); //이미 찜했는지 확인

        //찜 id 목록을 추가하거나 제거함
        const updatedLikes = liked ? likedIds.filter((id) => id !== item.id) //제거
            : [...likedIds, item.id]; //추가

        localStorage.setItem('likes', JSON.stringify(updatedLikes)) //저장
        setLikedIds(updatedLikes); //상태반영

        //굿즈 리스트 안의 likes 수 업데이트
        const updatedGoodsList = goodsList.map((g) =>
            g.id === item.id ? {
                ...g,
                likes: liked ? Math.max(g.likes - 1, 0) //좋아요수가 0보다 작아지지 않게
                    : g.likes + 1,
            } : g
        )
        setGoodsList(updatedGoodsList);
        localStorage.setItem('goodsList', JSON.stringify(updatedGoodsList));
    }
      console.log(item)
    return (
        <div className={`${styles.card} ${className ?? ''}`}> {/* classname이 없을 경우 빈 문자열로 대체해 undefind 방지 */}
            <Link to={`/goodsdetail/${item.id}`} className={styles.link}>
                <img src={item.imageUrl} alt={item.title} className={styles.image} />
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.price}>
                    {(item.price ?? 0).toLocaleString()}원
                </p>
            </Link>
            <div className={styles.cardFooter}>
                <button className={styles.likeButton} onClick={(e) => {
                    e.preventDefault();
                    toggleLike();
                }}>
                    {liked ? '💖' : '🤍'}
                </button>
            </div>
        </div>
    )
}
export default GoodsCard;