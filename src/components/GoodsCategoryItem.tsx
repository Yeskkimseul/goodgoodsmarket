import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";
import styles from './GoodsCategoryItem.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperClass } from 'swiper/types';
import 'swiper/css';
import 'swiper/css/navigation';

interface GoodsCategoryItemProps {
  idsToShow?: string[];
}

const categories = [
  { id: "1", name: "포토카드", imageUrl: "/images/main_imgs/GoodsCategoryItem1.png" },
  { id: "2", name: "인형", imageUrl: "/images/main_imgs/GoodsCategoryItem2.png" },
  { id: "3", name: "아크릴 굿즈", imageUrl: "/images/main_imgs/GoodsCategoryItem3.png" },
  { id: "4", name: "문구류", imageUrl: "/images/main_imgs/GoodsCategoryItem4.png" },
  { id: "5", name: "패션", imageUrl: "/images/main_imgs/GoodsCategoryItem5.png" },
  { id: "6", name: "음반", imageUrl: "/images/main_imgs/GoodsCategoryItem6.png" },
  { id: "7", name: "팬 라이트", imageUrl: "/images/main_imgs/GoodsCategoryItem7.png" },
  { id: "8", name: "잡지", imageUrl: "/images/main_imgs/GoodsCategoryItem8.png" },
  { id: "9", name: "티켓", imageUrl: "/images/main_imgs/GoodsCategoryItem9.png" },
  { id: "10", name: "팬 메이드", imageUrl: "/images/main_imgs/GoodsCategoryItem10.png" },
  { id: "11", name: "기타", imageUrl: "/images/main_imgs/GoodsCategoryItem11.png" }
];

const GoodsCategoryItem: React.FC<GoodsCategoryItemProps> = ({ idsToShow }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(null);
  const isDragging = useRef(false);

  const filteredCategories = idsToShow
    ? categories.filter(cat => idsToShow.includes(cat.id))
    : categories;

  const preventClickOnDrag = (e: React.MouseEvent) => {
    if (isDragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className={styles.swiperWrapper}>

      <button
        className={`custom-prev ${isBeginning ? 'disabled' : ''}`}
        disabled={isBeginning}
        aria-label="Previous slide"
      >
        ←
      </button>

      <button
        className={`custom-next ${isEnd ? 'disabled' : ''}`}
        disabled={isEnd}
        aria-label="Next slide"
      >
        →
      </button>

      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={9}
        loop={false}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        allowTouchMove={true}
        breakpoints={{
          0: { slidesPerView: 4 },
          550: { slidesPerView: 5 },
          760: { slidesPerView: 7 },
          1080: { slidesPerView: 9 },
        }}
        style={{
          "--swiper-navigation-color": "#1DC6A7",
        } as React.CSSProperties}
        onSwiper={(swiper: SwiperClass) => setSwiperInstance(swiper)}
        onSlideChange={(swiper: SwiperClass) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onTouchStart={() => (isDragging.current = false)}
        onTouchMove={() => (isDragging.current = true)}
        onTouchEnd={() => setTimeout(() => (isDragging.current = false), 0)}
        onSlidePrevTransitionStart={() => (isDragging.current = false)}
        onSlideNextTransitionStart={() => (isDragging.current = false)}
      >
        {filteredCategories.map((category) => (
          <SwiperSlide key={category.id}>
            <Link
              to={`/home/goodscategory/${category.id}`}
              onClick={preventClickOnDrag}
              className={styles.listItem}
            >
              {category.imageUrl && (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  style={{ borderRadius: "500px", objectFit: "cover" }}
                />
              )}
              <p>{category.name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GoodsCategoryItem;
