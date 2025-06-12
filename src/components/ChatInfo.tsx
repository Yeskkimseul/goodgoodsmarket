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


    //판매자 상품이미지
    const productImage = chatInfo[0]?.productImage || "/images/sample_keyring.png";

    //select
    const [selectValue, setSelectValue] = useState("1");


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
                        <div className={styles.status}>
                            <select
                                className={`${styles.chatSelect} ${selectValue === "1" ? styles.pink : styles.gray}`}
                                value={selectValue}
                                onChange={e => setSelectValue(e.target.value)}
                            >
                                <option value="1" selected>판매중</option>
                                <option value="2">판매완료</option>
                            </select>
                            {/*  <span className={styles.status}>판매중
                            <img src="/images/chat/chevron-left.svg" alt="드롭다운" />
                        </span> */}
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

export default ChatInfo;