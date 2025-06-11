import style from "./GoodsDetail.module.css"
import form from "./form.module.css"
import Header from "../components/header/Header";
import Layout2 from "../components/Layout2";
import { useEffect, useState, useRef } from "react";
import { Goods } from "../types";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import MultiTab from "../components/exchangebuy/MultiTab";



const GoodsDetail = () => {

    const { id } = useParams<{ id: string }>();
    const [goods, setGoods] = useState<Goods | null>(null);
    const [activeIndex, setActiveIndex] = useState(1);
    const swiperRef = useRef<SwiperClass | null>(null);

    const categories = [
        { id: "1", name: "포토카드" },
        { id: "2", name: "인형" },
        { id: "3", name: "아크릴 굿즈" },
        { id: "4", name: "문구류" },
        { id: "5", name: "패션" },
        { id: "6", name: "음반" },
        { id: "7", name: "팬 라이트" },
        { id: "8", name: "잡지" },
        { id: "9", name: "티켓" },
        { id: "10", name: "팬 메이드" },
        { id: "11", name: "기타" }
    ];

    const categoryId = goods
        ? categories.find(cat => cat.name === goods.category)?.id
        : "";

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
            <div className={style.con}>
                <div className={style.topcon}>

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
                                    {goods && categoryId ? (
                                        <Link to={`/home/goodscategory/${categoryId}`}>
                                            {goods.category}
                                        </Link>
                                    ) : ""}
                                </p>
                                <div className={style.bullet}></div>
                                <p>
                                    {goods ? getTimeAgo(goods.createdAt) : ""}
                                </p>
                            </div>
                            <ul className={style.titright}>
                                <li className={style.goodsRate}>
                                    <img src="/images/icon/eye_small.svg" alt="작은눈"
                                        className={style.goodsIcon}
                                    />
                                    <span className={style.goodsRateText}>{goods ? goods.views : 0}</span>
                                </li>
                                <li className={style.goodsRate}>
                                    <img src="/images/icon/heart_small.svg" alt="
                            작은좋아요"
                                        className={style.goodsIcon}
                                    />
                                    <span className={style.goodsRateText}>{goods ? goods.likes : 0}</span>
                                </li>
                            </ul>
                        </div>{/* toptit */}
                        <div className={style.maintit}>
                            <div className="subtit1">
                                {goods ? goods.title : ""}
                            </div>
                            <h1>
                                {goods
                                    ? goods.isExchangeable
                                        ? "교환 희망 제품"
                                        : `${goods.price.toLocaleString()}원`
                                    : ""}
                            </h1>
                        </div>{/* maintit */}
                    </div>{/* titbox */}
                </div>{/* topcon */}

                <MultiTab tabs={['굿즈 정보', '판매자 정보']}>
                    {(activeIndex) => (
                        activeIndex === 0 ? (
                            <div className={style.tabcon}>
                                <ul className={style.optionList}>
                                    {goods && goods.options && goods.options.length > 0 ? (
                                        goods.options.map((opt, idx) => (
                                            <li key={idx} className={style.optionItem}>{opt}</li>
                                        ))
                                    ) : (
                                        <li className={style.optionItem}>옵션 없음</li>
                                    )}
                                </ul>
                                <p className='body2'>
                                    {goods?.description}
                                </p>
                            </div>
                        ) : activeIndex === 1 ? (
                            <div className={style.tabcon}>
                                <div className={style.userprofile}>
                                    <div className={style.usertop}>
                                        {goods && (
                                            <>
                                                <img
                                                    src={goods.sellerimgUrl}
                                                    alt={goods.sellerName}
                                                    className={style.sellerimg}
                                                />
                                                <span className={style.sellername}>{goods.sellerName}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : null
                    )}
                </MultiTab>
            </div>{/* con */}

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