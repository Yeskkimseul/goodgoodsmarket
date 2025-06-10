import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import AlarmList from "../components/AlarmList";

const Alarm = () => {
    const navigate = useNavigate();
    // 각 알림의 읽음 상태를 useState로 관리
    const [readList, setReadList] = useState<boolean[]>(() => {
        const saved = localStorage.getItem("alarmReadList");
        return saved ? JSON.parse(saved) : [false, false];
    });

    // 읽음 상태가 바뀔 때마다 localStorage에 저장
    useEffect(() => {
        localStorage.setItem("alarmReadList", JSON.stringify(readList));
    }, [readList]);

    // 알림 클릭 시 읽음 처리
    const handleRead = (idx: number, to: string) => {
        setReadList(prev => prev.map((r, i) => i === idx ? true : r));
        navigate(to);
    };

    return (
        <Layout>
            <Header type='type1' title='알림' />
            <AlarmList
                title="굿굿지기"
                leftContent='한강 보물찾기런 초대장🤸‍♀️'
                to='/'
                imgSrc='../images/mypage/alarm.png'
                imgAlt='공지사항'
                date='15분 전'
                read={readList[0]}
                onClick={() => handleRead(0, '/')}
            />
            <AlarmList
                title="삼장님"
                leftContent='새로운 채팅이 도착했습니다.'
                to='/chat'
                imgSrc='../images/mypage/alarm2.png'
                imgAlt='채팅알림'
                date='30분 전'
                read={readList[1]}
                onClick={() => handleRead(1, '/chat')}
            />
        </Layout>
    )
}
export default Alarm;