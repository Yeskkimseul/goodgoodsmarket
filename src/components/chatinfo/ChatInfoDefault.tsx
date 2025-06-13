import { useEffect, useState, useRef } from 'react';
import styles from './ChatInfo.module.css';
import type { Chatting } from "../../types/chatting";

const statusOptions = [
    { value: "1", label: "판매중", color: "#eb4677" },
    { value: "2", label: "판매완료", color: "#bbb" }
];

const ChatInfoDefault = () => {
    const [chatInfo, setChatInfo] = useState<Chatting[]>([]);
    const [status, setStatus] = useState("1"); // "1"=판매중, "2"=판매완료
    const [showStatusOptions, setShowStatusOptions] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        fetch("/data/chatting.json")
            .then(res => res.json())
            .then((data: Chatting[]) => setChatInfo(data.length > 0 ? [data[0]] : []));
    }, []);

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

    const productImage = chatInfo[0]?.productImage || "/images/sample_keyring.png";

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
                        <div className={styles.subtitle}>
                            판매중
                        </div>
                        <span className={styles.title}>하츄핑 키링 판매합니다.</span>
                    </div>
                    <div className={styles.price}>50,000원</div>
                </div>
            </div>
            <span className={styles.time}>15분 전</span>
        </div>
    );
};

export default ChatInfoDefault;
