import { useEffect, useState } from "react";
import GoodsCard from "../components/GoodsCard";
import Layout from "../components/Layout";
import { useGoods } from "../context/GoodsContext";
import styles from './CardListLayout.module.css'

const Home = () => {
    //굿즈 전체 리스트와 바꾸는 함수 (전역에서 관리 중)
    const { goodsList, setGoodsList } = useGoods();
    //내가 찜한 굿즈 id 목록 (localstorage 기반)
    const [likedIds, setLikedIds] = useState<string[]>([]);
    //찜한 것만 보기 버튼 눌렀을때
    const [showOnlyLiked, setshowOnlyLiked] = useState(false)
    useEffect(() => {
        const stored = localStorage.getItem('goodsList'); //저장된 굿즈
        const liked = localStorage.getItem('likes');

        //로컬 스토리지에 있으면 그걸 쓰고
        if (stored) setGoodsList(JSON.parse(stored));
        else {
            fetch('data/goods.json') //불러옴
                .then((res) => res.json()) //json형식으로 바꾸기(자바스크립트 객체로 변환)
                .then((data) => {
                    setGoodsList(data) //가져온 데이터를 화면에 보여줄 상태에 저장
                    localStorage.setItem('goodsList', JSON.stringify(data));
                    //localstorage에도 똑같이 저장 = 새로고침해도 유지되게
                })
        }
        if(liked) setLikedIds(JSON.parse(liked));
    }, [setGoodsList])
    //보여줄 리스트 결정 : 찜필터 on이면 찜한 것만 보여주기
    const displayedList = showOnlyLiked
        ? goodsList.filter((item) => likedIds.includes(item.id)) /* 찜한 굿즈만 걸리게끔 필터 */
        : goodsList;

    return (
        <Layout>
            {/* 상단 찜 갯수/필터 버튼 */}
            <div className={styles.topBar}>
                <span className={styles.likeCount}>
                    💖 찜한 굿즈: {likedIds.length}개
                </span>
                <button onClick={() => setshowOnlyLiked(!showOnlyLiked)}
                    className={styles.filterButton}>
                    {showOnlyLiked ? '전체 보기' : '찜한 굿즈만 보기'}
                </button>
            </div>

            {/* 굿즈 카드 리스트 영역 */}
            <div className={styles.list}>
                {
                    displayedList.map((item) => (
                        <GoodsCard
                            key={item.id}
                            item={item}
                            likedIds={likedIds}
                            setLikedIds={setLikedIds}
                            goodsList={goodsList}
                            setGoodsList={setGoodsList}
                            className={styles.card}
                        />
                    ))
                }
            </div>
        </Layout>
    )
}
export default Home;