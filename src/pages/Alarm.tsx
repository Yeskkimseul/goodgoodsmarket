import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import AlarmList from "../components/AlarmList";

const Alarm = () => {
    const navigate = useNavigate();

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
            />
            <AlarmList
                title="삼장님"
                leftContent='새로운 채팅이 도착했습니다.'
                to='/chat'
                imgSrc='../images/mypage/alarm2.png'
                imgAlt='채팅알림'
                date='30분 전'
            />
        </Layout>
    )
}
export default Alarm;