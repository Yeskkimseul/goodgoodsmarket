import { useEffect, useState } from 'react';
import styles from './ChatInfo.module.css';
import type { Chatting } from "../types/chatting";

interface ChatMessagesProps {
    chats: Chatting[];
}






const ChatInfo = () => {

    useEffect(() => {
        fetch("/data/chatting.json")
            .then(res => res.json())
            .then((data: Chatting[]) => setChatInfo(data.length > 0 ? [data[0]] : [])) // 첫 번째 채팅만 표시;
    }, []);


    const [chatInfo, setChatInfo] = useState<Chatting[]>([]);

    const productImage = chatInfo[0]?.productImage || "/images/sample_keyring.png";
    return (
        <div className={styles.chatInfo}>
            <img
                src={productImage}
                alt="상품 이미지"
                className={styles.thumb}
            />
            <div className={styles.info}>
                <div className={styles.row}>
                    <span className={styles.status}>판매중</span>
                    <span className={styles.desc}>하츄핑 키링 판매합니다.</span>
                <div className={styles.price}>50,000원</div>
                </div>
            </div>
                    <span className={styles.time}>15분 전</span>
        </div>
    );
};

export default ChatInfo;