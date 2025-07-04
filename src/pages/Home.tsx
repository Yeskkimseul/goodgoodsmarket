import { useEffect, useState } from "react";
import GoodsCard from "../components/GoodsCard";
import Layout from "../components/Layout";
import { useGoods } from "../context/GoodsContext";
import styles from './CardListLayout.module.css'
import GoodsCategoryItem from "../components/GoodsCategoryItem";
import CommuCard from "../components/CommuCard";
import { useCommu } from "../context/CommuContext";
import MainMoreBtn from "../components/MainMoreBtn";
import Header from "../components/header/Header";
// import ChatbaseWidget from "../components/ChatbaseWidget";

/* swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
    const { goodsList, setGoodsList } = useGoods();
    const { commuList, setCommuList } = useCommu();

    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [showOnlyLiked, setshowOnlyLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // ✅ 모바일 여부 판단용

    const blockedUsers = JSON.parse(localStorage.getItem("blockedUsers") || "[]");
    // 굿즈 커뮤니티 카드 렌더링 시 차단 유저 제외
    const visibleCommuList = commuList.filter(item => !blockedUsers.includes(item.userName));

    const displayedList = showOnlyLiked
        ? goodsList.filter((item) => likedIds.includes(item.id))
        : goodsList;

    // localStorage에서 좋아요/댓글/조회수 불러오기
    const commuLikes = JSON.parse(localStorage.getItem("commuLikes") || "{}");
    const commuComments = JSON.parse(localStorage.getItem("commuComments") || "{}");
    const commuViews = JSON.parse(localStorage.getItem("commuViews") || "{}");


    useEffect(() => {
        const stored = localStorage.getItem('goodsList');
        const liked = localStorage.getItem('likes');

        if (stored) setGoodsList(JSON.parse(stored));
        else {
            fetch('/data/goods.json')
                .then((res) => res.json())
                .then((data) => {
                    setGoodsList(data)
                    localStorage.setItem('goodsList', JSON.stringify(data));
                })
        }
        if (liked) setLikedIds(JSON.parse(liked));
    }, [setGoodsList]);

    useEffect(() => {
        fetch('data/commu.json')
            .then((res) => res.json())
            .then((data) => setCommuList(data));
    }, [setCommuList]);

    // ✅ 모바일 여부 체크
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 500);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);



    return (
        <Layout>
            <Header type="type7" />

            <div className={styles.pageContent}>
                {/* ✅ Swiper 슬라이드 - 모바일 이미지 대응 */}
                <div className={styles.mainThumb}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ el: '.swiper-pagination', clickable: true }}
                        autoplay={{ delay: 3000 }}
                        loop
                    >
                        <SwiperSlide>
                            <img
                                src={isMobile ? "/images/mobile_thumb1.jpg" : "/images/main_thumb.jpg"}
                                alt="굿즈 썸네일1"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={isMobile ? "/images/mobile_thumb2.jpg" : "/images/main_thumb2.png"}
                                alt="굿즈 썸네일2"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={isMobile ? "/images/mobile_thumb3.png" : "/images/main_thumb3.png"}
                                alt="굿즈 썸네일3"
                            />
                        </SwiperSlide>
                    </Swiper>
                    <div className="swiper-pagination"></div> {/* Swiper 아래에 직접 배치 */}
                </div>

                <div className={styles.conlist}>
                    <div className={styles.con}>
                        <GoodsCategoryItem />
                    </div>

                    <div className={styles.con}>
                        <div className={styles.goodgoodspicktxt}> <span>굿</span>굿즈 Pick </div>
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
                    </div>

                    <div className={styles.con}>
                        <div className={styles.goodgoodspicktxt}> <span>굿</span>굿즈 커뮤니티 </div>
                        <div style={{ padding: '0 var(--padding)' }}>
                            {
                                visibleCommuList.slice(0, 4).map((item) => {
                                    const likes = commuLikes[item.id] ?? item.likes;
                                    const commentsNum = commuComments[item.id] ?? item.commentsNum;
                                    const views = commuViews[item.id] ?? item.views;
                                    const newItem = { ...item, likes, commentsNum, views };

                                    return (
                                        <CommuCard
                                            key={item.id}
                                            item={newItem}
                                            className={styles.card}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                <MainMoreBtn />

            </div>
        </Layout>
    )
}

export default Home;
