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
    const isLikeDisabled = item.sellerName === '뱃지가좋아';


    //처음 들어오거나 likedIds가 바뀌면 liked 상태 업데이트
    useEffect(() => {
        setliked(likedIds.includes(String(item.id)));
    }, [likedIds, item.id])

    const toggleLike = () => {
        const id = String(item.id); // ← 여기서 string 변환 고정
        const liked = likedIds.includes(id);

        const updatedLikes = liked
            ? likedIds.filter((likeId) => likeId !== id) // string끼리 비교
            : [...likedIds, id];                         // string으로 추가

        localStorage.setItem('likes', JSON.stringify(updatedLikes));
        setLikedIds(updatedLikes);

        const updatedGoodsList = goodsList.map((g) =>
            g.id === item.id
                ? {
                    ...g,
                    likes: liked ? Math.max(g.likes - 1, 0) : g.likes + 1,
                }
                : g
        );
        setGoodsList(updatedGoodsList);
        localStorage.setItem('goodsList', JSON.stringify(updatedGoodsList));
    };

    console.log(item)
    return (
        <div className={`${styles.card} ${className ?? ''}`}> {/* classname이 없을 경우 빈 문자열로 대체해 undefind 방지 */}
            <Link to={`/home/goodsdetail/${item.id}`} className={styles.link}
                onClick={() => {
                    // 최근 본 상품 id 배열을 localStorage에서 불러오기
                    const viewed = JSON.parse(localStorage.getItem('recentViewed') || '[]');
                    // 이미 있으면 중복 제거
                    // 이 필터도 아래처럼 바꿔야 정확히 동작함
                    const newViewed = [String(item.id), ...viewed.filter((id: string) => id !== String(item.id))];

                    localStorage.setItem('recentViewed', JSON.stringify(newViewed));
                }}
            >
                <div className={styles.cardTop}>
                    <img src={item.imageUrl[0]} alt={item.title} className={styles.image} />
                    <button
                        className={styles.likeButton}
                        onClick={(e) => {
                            e.preventDefault();

                            if (isLikeDisabled) {
                                alert('내 상품은 찜할 수 없어요!');
                                return;
                            }

                            toggleLike();
                        }}
                    >
                        <img
                            src={
                                isLikeDisabled
                                    ? process.env.PUBLIC_URL + '/images/icon/heartdisabled.svg'
                                    : liked
                                        ? process.env.PUBLIC_URL + '/images/icon/heart_on.svg'
                                        : process.env.PUBLIC_URL + '/images/icon/heart_off.svg'
                            }
                            alt={
                                isLikeDisabled
                                    ? '좋아요 비활성화'
                                    : liked
                                        ? '좋아요 취소'
                                        : '좋아요'
                            }
                            className={styles.heartIcon}
                        />
                    </button>
                </div>
                <h4 className={styles.title}>{item.title}</h4>
                <h4 className={styles.price}>
                    {item.isCompleted
                        ? '거래 완료 제품'
                        : item.isExchangeable
                            ? '교환 희망 제품'
                            : (item.price ?? 0).toLocaleString() + '원'}
                </h4>
            </Link>
        </div>
    )
}
export default GoodsCard;