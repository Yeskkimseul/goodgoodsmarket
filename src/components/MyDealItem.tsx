import { Goods } from "../types";
import styles from "./MyDealItem.module.css"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import forms from "../pages/form.module.css";
import Modal from "./Modal";

interface Props {
    item: Goods;
    className?: string; //?를 붙여 클래스를 문자열로 받아도 되고 아니어도 됨
    setGoodsList: React.Dispatch<React.SetStateAction<Goods[]>>;
}

// 날짜 포맷 함수 추가
const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd}`;
};

const MyDealItem = ({ item, className, setGoodsList }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    // 카드 클릭 시 detail로 이동
    const handleCardClick = (e: React.MouseEvent) => {
        // 삭제 버튼 클릭 시에는 이동 방지
        if ((e.target as HTMLElement).closest("button")) return;
        window.location.href = `/home/goodsdetail/${item.id}`;
    };

    // 삭제 로직
    const handleDelete = () => {
        setGoodsList(prev => {
            const updated = prev.filter(g => g.id !== item.id);
            // localStorage 동기화
            localStorage.setItem("goodsList", JSON.stringify(updated));
            // 서버(goods.json) 동기화는 실제 서비스에서는 API 필요, 개발환경에서는 fetch/PUT 등 사용
            return updated;
        });
        setIsModalOpen(false);
    };

    return (
        <>
            <div className={`${styles.card} ${className ?? ''}`}
                onClick={handleCardClick}
                style={{ cursor: 'pointer' }}
            > {/* classname이 없을 경우 빈 문자열로 대체해 undefind 방지 */}
                <div className={styles.cardLeft}>
                    <img src={item.imageUrl[0]} alt={item.title} className={styles.image} />
                </div>
                <div className={styles.cardright}>
                    <div className={styles.righttop}>
                        <div className={styles.title}>{item.title}</div>
                        <div className={styles.price}>
                            {item.isExchangeable
                                ? '교환 희망 제품'
                                : (item.price ?? 0).toLocaleString() + '원'}
                        </div>
                    </div>
                    <div className={styles.date_like}>
                        <span className="caption">
                            {formatDate(item.createdAt)}
                        </span>
                        <div className={styles.heart}>
                            <img src="/images/icon/heart_small.svg" alt="찜개수" />
                            {item.likes}
                        </

                        div>
                    </div>
                    <div className={styles.btns}>
                        <button className={forms.button_sm}
                            style={{ backgroundColor: 'var(--bg-lightE)', color: 'var(--text-grey)' }}
                            onClick={e => {
                                e.stopPropagation();
                                setIsModalOpen(true);
                            }}
                        >
                            삭제하기
                        </button>
                        <button className={forms.button_sm} onClick={e => {
                            e.stopPropagation();
                            navigate(`/mypage/goodsedit/${item.id}`);
                        }}>
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                title={`정말 삭제할까요?`}
                description="채팅이 있는 게시글을 삭제하면 거래 상대방이 당황할 수 있어요."
                confirmText="삭제하기"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    )
};

export default MyDealItem;