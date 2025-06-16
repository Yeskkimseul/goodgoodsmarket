import style from "./GoodsDetail.module.css"
import form from "./form.module.css"
import Header from "../components/header/Header";
import Layout2 from "../components/Layout2";
import { useEffect, useState, useRef } from "react";
import { Goods } from "../types";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper';
import MultiTab from "../components/exchangebuy/MultiTab";
import Trust from "../components/Trust";
import ReviewCard from "../components/ReviewCard";
import { useReview } from "../context/ReviewContext";

const GoodsDetail = () => {
    const { reviews } = useReview();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [goods, setGoods] = useState<Goods | null>(null);
    const [activeTabIndex, setActiveTabIndex] = useState(0); // 탭 인덱스 (0: 첫번째 탭)
    const [activeSlideIndex, setActiveSlideIndex] = useState(1); // 이미지 슬라이드 인덱스 (1부터 시작)

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const swiperRef = useRef<SwiperClass | null>(null);

    const handleLike = () => {
        if (!goods) return;

        const likes = JSON.parse(localStorage.getItem('likes') || '[]');
        const idStr = String(goods.id);

        let updatedLikes;
        let message;
        let updatedGoods;

        if (likes.includes(idStr)) {
            // 찜 해제
            updatedLikes = likes.filter((likeId: string) => likeId !== idStr);
            message = "찜 목록에서 제외되었습니다.";

            updatedGoods = {
                ...goods,
                likes: Math.max((goods.likes || 0) - 1, 0), // 음수 방지
            };
        } else {
            // 찜 추가
            updatedLikes = [...likes, idStr];
            message = "찜 목록에 추가되었습니다.";

            updatedGoods = {
                ...goods,
                likes: (goods.likes || 0) + 1,
            };
        }

        // 상태 반영
        setGoods(updatedGoods);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));

        // 스낵바 표시
        setSnackbarMessage(message);
        setShowSnackbar(true);
        setSnackbarVisible(true);
        setTimeout(() => {
            setSnackbarVisible(false);
            setTimeout(() => setShowSnackbar(false), 300);
        }, 1800);
    };


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

    const sellerReviews = goods
        ? reviews.filter(r => r.sellerName === goods.sellerName)
        : [];

    useEffect(() => {
        /* localStorage에서 goodsList불러오기 */
        const stored = localStorage.getItem("goodsList");
        if (stored) {
            const goodsList = JSON.parse(stored);
            const found = goodsList.find((item: Goods) => item.id === id);
            setGoods(found ?? null);
        } else {
            /* 없으면 commu.json에서 불러오기 */
            fetch("/data/goods.json")
                .then(res => res.json())
                .then((data: Goods[]) => {
                    const found = data.find(item => item.id === id);
                    setGoods(found ?? null);
                });
        }
    }, [id]);

    // 상품 id가 바뀔 때 탭 인덱스 초기화
    useEffect(() => {
        setActiveTabIndex(0); // 항상 첫 번째 탭으로
        setActiveSlideIndex(1); // 첫 번째 이미지로
        window.scrollTo(0, 0);
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

    useEffect(() => {
        if (!goods) return;

        // 이미 증가시켰는지 체크(새로고침/탭 이동 시 중복 방지)
        const viewedKey = `goods_viewed_${goods.id}`;
        if (sessionStorage.getItem(viewedKey)) return;

        // 조회수 1 증가
        const newViews = (goods.views || 0) + 1;
        setGoods({ ...goods, views: newViews });

        // localStorage의 goodsList도 업데이트
        const stored = localStorage.getItem("goodsList");
        if (stored) {
            const goodsList = JSON.parse(stored);
            const updatedList = goodsList.map((item: Goods) =>
                item.id === goods.id ? { ...item, views: newViews } : item
            );
            localStorage.setItem("goodsList", JSON.stringify(updatedList));
        }

        // 중복 증가 방지 플래그
        sessionStorage.setItem(viewedKey, "1");
    }, [goods]);
    const handleStartChat = () => {
        if (!goods || goods.isCompleted) return;

        const roomId = crypto.randomUUID();

        const newRoom = {
            roomId,
            productId: goods.id,
            title: goods.title,
            price: goods.isExchangeable ? "교환 희망" : `${goods.price.toLocaleString()}원`,
            productImage: goods.imageUrl?.[0] ?? "",
            sellerName: goods.sellerName,
            sellerProfile: goods.sellerimgUrl,
            messages: [],
           createdAt: goods.createdAt ?? new Date().toISOString()
        };

        const existing = JSON.parse(localStorage.getItem("chatRooms") || "[]");
        localStorage.setItem("chatRooms", JSON.stringify([...existing, newRoom]));

        navigate(`/chat/${roomId}`);
    };

    useEffect(() => {
        const stored = localStorage.getItem("goodsList");
        const likes = JSON.parse(localStorage.getItem("likes") || "[]");

        if (stored) {
            const goodsList = JSON.parse(stored);
            let found = goodsList.find((item: Goods) => item.id === id);

            // likes 리스트에 현재 상품 ID가 있는 경우 수동 증가
            if (found && likes.includes(String(found.id))) {
                found = {
                    ...found,
                    likes: (found.likes || 0) + 1,
                };
            }

            setGoods(found ?? null);
        } else {
            fetch("/data/goods.json")
                .then(res => res.json())
                .then((data: Goods[]) => {
                    let found = data.find(item => item.id === id);
                    if (found && likes.includes(String(found.id))) {
                        found = {
                            ...found,
                            likes: (found.likes || 0) + 1,
                        };
                    }
                    setGoods(found ?? null);
                });
        }
    }, [id]);


    return (
        <Layout2>
            <Header type="type2-2" />
            <div className={style.con}>
                <div className={style.topcon}>

                    <Swiper
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        loop
                        className={style.itemswiper}
                        onSlideChange={(swiper: SwiperClass) => setActiveSlideIndex(swiper.realIndex + 1)}
                        onSwiper={(swiper: SwiperClass) => { swiperRef.current = swiper; }}
                    >
                        <div className={style.page}>
                            <div className={style.activenum}>
                                {activeSlideIndex}
                            </div>
                            <div className={style.right}>
                                <div className={style.slash}>/</div>
                                <div className={style.allpagenum}>
                                    {goods ? goods.imageUrl.length : 0}
                                </div>
                            </div>
                        </div>
                        {goods && Array.isArray(goods.imageUrl)
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
                                    ? goods.isCompleted
                                        ? "거래 완료 제품"
                                        : goods.isExchangeable
                                            ? "교환 희망 제품"
                                            : `${goods.price.toLocaleString()}원`
                                    : ""}
                            </h1>
                        </div>{/* maintit */}
                    </div>{/* titbox */}
                </div>{/* topcon */}

                <MultiTab
                    tabs={['굿즈 정보', '판매자 정보']}
                    activeIndex={activeTabIndex}
                    setActiveIndex={setActiveTabIndex}
                >
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
                                <p className='body2' dangerouslySetInnerHTML={{ __html: goods?.description.replace(/\n/g, "<br>") || "" }} />

                            </div>
                        ) : activeIndex === 1 ? (
                            <div className={style.tabcon2}>
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
                                    <Trust trust={goods ? goods.sellerTrust : 0} />
                                </div>
                                <div className={style.reviewsinner}>
                                    {sellerReviews.map(review => (
                                        <ReviewCard
                                            key={review.id}
                                            review={review}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : null
                    )}
                </MultiTab>
            </div>{/* con */}

            <div className={style.bottom} style={goods?.sellerName === "뱃지가좋아" ? { display: "none" } : {}}>
                <div className={style.bts}>
                    <div className={form.button_big} style={{ background: 'var(--bg-white)', color: 'var(--text-grey)', border: '1px solid var(--stroke-grey)' }}
                        onClick={handleLike}>
                        찜하기
                    </div>
                    <div className={form.button_big} style={
                        goods && goods.isCompleted
                            ? { background: 'var(--button-bgdisabled)', color: 'var(--button-textdisabled)', cursor: 'default' }
                            : undefined}
                        onClick={handleStartChat}
                    >
                        채팅하기
                    </div>
                </div>

                {showSnackbar && (
                    <div className={style.snackbar_wrap}>
                        <div className={snackbarVisible ? style.snackbar : style.snackbar_hide}>
                            {snackbarMessage}
                        </div>
                    </div>
                )}
            </div>
        </Layout2>
    )

}

export default GoodsDetail;