import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import styles from './GoodsCategoryItem.module.css';

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


const GoodsCategoryItem = () => {
    const containerRef = useRef<HTMLUListElement>(null);
    const isDragging = useRef(false);
    const dragStarted = useRef(false);
    let startX = 0;
    let scrollLeft = 0;

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        isDragging.current = false;
        dragStarted.current = true;
        startX = e.pageX - containerRef.current.offsetLeft;
        scrollLeft = containerRef.current.scrollLeft;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!dragStarted.current || !containerRef.current) return;
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = x - startX;
        if (Math.abs(walk) > 5) isDragging.current = true; // 드래그 판단 기준
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleMouseUp = () => {
        dragStarted.current = false;
        setTimeout(() => (isDragging.current = false), 0); // 클릭보다 늦게 리셋
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (!containerRef.current) return;
        dragStarted.current = true;
        isDragging.current = false;
        startX = e.touches[0].pageX - containerRef.current.offsetLeft;
        scrollLeft = containerRef.current.scrollLeft;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!dragStarted.current || !containerRef.current) return;
        const x = e.touches[0].pageX - containerRef.current.offsetLeft;
        const walk = x - startX;
        if (Math.abs(walk) > 5) isDragging.current = true;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    const handleTouchEnd = () => {
        dragStarted.current = false;
        setTimeout(() => (isDragging.current = false), 0);
    };

    const preventClickOnDrag = (e: React.MouseEvent) => {
        if (isDragging.current) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <ul className={styles.listContainer}
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            {categories.map((category) => (
                <li key={category.id} className={styles.listItem}>
                    <Link to={`/home/goodscategory/${category.id}`}>
                        {category.imageUrl && (
                            <img
                                src={category.imageUrl}
                                alt={category.name}
                                style={{ borderRadius: "500px", objectFit: "cover" }}
                            />
                        )}
                        <p>{category.name}</p>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default GoodsCategoryItem;