import { use, useEffect, useState } from "react";
import GoodsCard from "../components/GoodsCard";
import Layout from "../components/Layout";
import { useGoods } from "../context/GoodsContext";
import styles from './CardListLayout.module.css'
import GoodsCategoryItem from "../components/GoodsCategoryItem";
import CommuCard from "../components/CommuCard";
import { useCommu } from "../context/CommuContext";
import MainMoreBtn from "../components/MainMoreBtn";
import Header from "../components/header/Header";

const Home = () => {
    //굿즈 전체 리스트와 바꾸는 함수 (전역에서 관리 중)
    const { goodsList, setGoodsList } = useGoods();

    //커뮤니티 전체 리스트와 바꾸는 함수 (전역에서 관리 중)
    const { commuList, setCommuList } = useCommu();

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
        if (liked) setLikedIds(JSON.parse(liked));
    }, [setGoodsList])

    //커뮤니티 데이터 불러오기
    useEffect(() => {
        fetch('data/commu.json')
            .then((res) => res.json())
            .then((data) => setCommuList(data));
    }, [setCommuList]);

    //보여줄 리스트 결정 : 찜필터 on이면 찜한 것만 보여주기
    const displayedList = showOnlyLiked
        ? goodsList.filter((item) => likedIds.includes(item.id)) /* 찜한 굿즈만 걸리게끔 필터 */
        : goodsList;
console.log("전체 굿즈 개수:", displayedList.length);


    return (
        <Layout>
            <Header type="type7"></Header>
            {/* 상단 찜 갯수/필터 버튼 */}
            {/*  <div className={styles.topBar}>
                <span className={styles.likeCount}>
                    💖 찜한 굿즈: {likedIds.length}개
                </span>
                <button onClick={() => setshowOnlyLiked(!showOnlyLiked)}
                    className={styles.filterButton}>
                    {showOnlyLiked ? '전체 보기' : '찜한 굿즈만 보기'}
                </button>
            </div> */}



            <div> 배너 슬라이드 </div>

            <div>
                <GoodsCategoryItem />
            </div>

            <div className={styles.goodgoodspick}>
                {
                    displayedList.slice(0, 8).map((item) => (
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
            <div>
                {
                    commuList.slice(0, 4).map((item) => (
                        <CommuCard
                            key={item.id}
                            item={item}
                            className={styles.card}
                        />
                    ))
                }
            </div>
            <MainMoreBtn />
        </Layout>
    )
}
export default Home;