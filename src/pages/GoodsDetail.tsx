import style from "./GoodsDetail.module.css"
import form from "./form.module.css"
import Header from "../components/header/Header";
import Layout2 from "../components/Layout2";
import { useEffect, useState, useRef } from "react";
import { Goods } from "../types";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';


const GoodsDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [goods, setGoods] = useState<Goods | null>(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const swiperRef = useRef<SwiperClass | null>(null);

    useEffect(() => {
        fetch("/data/goods.json")
            .then(res => res.json())
            .then((data: Goods[]) => {
                const found = data.find(item => item.id === id);
                setGoods(found ?? null);
            });
    }, [id]);

    //시간 변경
    function getTimeAgo(dateString: string) {
        const now = new Date();
        const created = new Date(dateString);
        const diff = Math.floor((now.getTime() - created.getTime()) / 1000); // 초 단위

        if (diff < 60) return `${diff}초 전`;
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        return `${Math.floor(diff / 86400)}일 전`;
    }

    return (
        <Layout2>
            <Header type="type2" />
            <Swiper
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop
                className={style.itemswiper}
                onSlideChange={(swiper: SwiperClass) => setActiveIndex(swiper.realIndex + 1)}
                onSwiper={(swiper: SwiperClass) => { swiperRef.current = swiper; }}
            >
                <div className={style.page}>
                    <div className={style.activenum}>
                        {activeIndex}
                    </div>
                    <div className={style.right}>
                        <div className={style.slash}>/</div>
                        <div className={style.allpagenum}>
                            {goods ? goods.imageUrl.length : 0}
                        </div>
                    </div>
                </div>
                {goods
                    ? goods.imageUrl.map((img, idx) => (
                        <SwiperSlide key={idx} className={style.slideimg}>
                            <img src={img} alt={goods.title} />

                        </SwiperSlide>
                    ))
                    : (
                        <SwiperSlide>
                            로딩 중...
                        </SwiperSlide>
                    )
                }

            </Swiper>
            <div className={style.titbox}>
                <div className={style.toptit}>
                    <div className={style.titleft}>
                        <p className={style.category}>
                            {goods ? goods.category : ""}
                        </p>
                        <div className={style.bullet}></div>
                        <p>
                            {goods ? getTimeAgo(goods.createdAt) : ""}
                        </p>
                    </div>
                    <ul className={style.titright}>
                        <li className={style.goodsicon}>

                        </li>
                    </ul>
                </div>
            </div>{/* titbox */}

            <div className={style.bottom}>
                <div className={style.bts}>
                    <div className={form.button_big} style={{ background: 'var(--bg-white)', color: 'var(--text-grey)', border: '1px solid var(--stroke-grey)' }}>
                        찜하기
                    </div>
                    <div className={form.button_big}>
                        채팅하기
                    </div>
                </div>
            </div>
        </Layout2>
    )

}

export default GoodsDetail;