import { useEffect, useState, useRef } from 'react';
import styles from './ChatInfo.module.css';
import type { Chatting } from "../../types/chatting";

interface ChatInfoDefaultProps {
    chat: Chatting;
}


function getTimeAgo(dateString: string): string {
    const date = new Date(dateString);
    const month = date.getMonth() + 1; // 월은 0부터 시작
    const day = date.getDate();
    return `${month}월 ${day}일`;
}

const statusOptions = [
    { value: "1", label: "판매중", color: "#eb4677" },
    { value: "2", label: "판매완료", color: "#bbb" }
];

const ChatInfoSeller = ({ chat }: ChatInfoDefaultProps) => {
    const [status, setStatus] = useState("1"); // "1"=판매중, "2"=판매완료
    const [showStatusOptions, setShowStatusOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

 

    // 외부 클릭 시 닫힘
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                showStatusOptions &&
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                setShowStatusOptions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showStatusOptions]);

    const productImage = chat.productImage || "/images/sample_keyring.png";

    return (
        <div className={styles.chatInfo}>
            <div className={styles.info_right}>
                <img
                    src={productImage}
                    alt="상품 이미지"
                    className={styles.thumb}
                />
                <div className={styles.info}>
                    <div className={styles.top}>
                        {/* === 여기부터 커스텀 드롭다운 === */}
                        <div className={styles.status} ref={dropdownRef}>
                            <button
                                className={`${styles.statusBtn} ${status === "1" ? styles.pink : styles.gray}`}
                                type="button"
                                onClick={() => setShowStatusOptions(prev => !prev)}
                            >
                                {statusOptions.find(opt => opt.value === status)?.label}
                                <img
                                    className={styles.arrow}
                                    src="/images/chat/chevron-left.svg" alt="화살표" />
                            </button>
                            {showStatusOptions && (
                                <ul className={styles.chatSelect}>
                                    {statusOptions.map(opt => (
                                        <li
                                            key={opt.value}
                                            onClick={() => {
                                                setStatus(opt.value);
                                                setShowStatusOptions(false);
                                            }}
                                            className={`
    ${opt.value === "1" ? styles.pink : styles.gray}
    ${opt.value === status ? styles.selected : ""}
    ${styles.statusOption}
  `}
                                        >
                                            {opt.label}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        {/* === 여기까지 커스텀 드롭다운 === */}
                        <span className={styles.title}>{chat.title || ""}</span>
                    </div>
                    <div className={styles.price}>{chat.price || ""}</div>
                </div>
            </div>
            <span className={styles.time}>{getTimeAgo(chat.createdAt)}</span>
        </div>
    );
};

export default ChatInfoSeller;
