import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Chatting } from "../types/chatting";
import styles from './CardListLayout.module.css';
import filterstyles from './filter.module.css';
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import ChatList from "../components/ChatList";

const Chat = () => {

    const [chatList, setChatList] = useState<Chatting[]>([]);
    const [filter, setFilter] = useState<string>('전체');
    const filterList = [
        { label: '전체', value: '전체' },
        { label: '판매', value: '판매' },
        { label: '구매', value: '구매' },
        { label: '교환', value: '교환' },
    ];
    const navigate = useNavigate();

    useEffect(() => {
        const stored = localStorage.getItem('chatList');
        if (stored) {
            setChatList(JSON.parse(stored));
        } else {
            //채팅 데이터 불러오기
            fetch('data/chatting.json')
                .then((res) => res.json())
                .then((data) => setChatList(data));
        }
    }, []);

    // 필터링/정렬 로직
    const filteredList = filter === '전체'
        ? chatList
        : chatList.filter(item => {
            if (filter === '판매') return item.type === '판매';
            if (filter === '구매') return item.type === '구매';
            if (filter === '교환') return item.type === '교환';
            return true;
        });


    return (
        <Layout>
            <Header type="type6" />
            <div className={filterstyles.filterContainer}>
                {filterList.map(f => (
                    <button
                        className={`${filterstyles.filterButton} ${filter === f.value ? filterstyles.active : ''}`}
                        key={f.value}
                        onClick={() => setFilter(f.value)}
                    >
                        {f.label}
                    </button>
                ))}
            </div>
            <ChatList chats={filteredList} />
        </Layout>
    )

};

export default Chat;