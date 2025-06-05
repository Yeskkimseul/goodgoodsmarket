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

/* swiper */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Home = () => {
    const { goodsList, setGoodsList } = useGoods();
    const { commuList, setCommuList } = useCommu();

    const [likedIds, setLikedIds] = useState<string[]>([]);
    const [showOnlyLiked, setshowOnlyLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(false); // ✅ 모바일 여부 판단용

    useEffect(() => {
        const stored = localStorage.getItem('goodsList');
        const liked = localStorage.getItem('likes');

        if (stored) setGoodsList(JSON.parse(stored));
        else {
            fetch('data/goods.json')
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

    const displayedList = showOnlyLiked
        ? goodsList.filter((item) => likedIds.includes(item.id))
        : goodsList;

    console.log("전체 굿즈 개수:", displayedList.length);

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
                        pagination={{ clickable: true }}
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
                                src={isMobile ? "/images/mobile_thumb2.jpg" : "/images/main_thumb2.jpg"}
                                alt="굿즈 썸네일2"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={isMobile ? "/images/mobile_thumb3.jpg" : "/images/main_thumb3.jpg"}
                                alt="굿즈 썸네일3"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                <div>
                    <GoodsCategoryItem />
                </div>

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

                <div className={styles.goodgoodspicktxt}> <span>굿</span>굿즈 커뮤니티 </div>
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
            </div>
        </Layout>
    )
}

export default Home;
