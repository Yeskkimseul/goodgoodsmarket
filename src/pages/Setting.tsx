import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import MypageList from "../components/MypageList";
import mypageStyles from "./Mypage.module.css";
import Modal from "../components/Modal";

const Setting = () => {
    const navigate = useNavigate();
    const [isCacheModalOpen, setCacheModalOpen] = useState(false);
    const [isVibrate, setIsVibrate] = useState(false);
    const [isChat, setIsChat] = useState(false);

    return (
        <Layout>
            <Header type='type1' title='앱설정' />
            <div className={mypageStyles.section}>
                <div className={mypageStyles.title}>
                    알림설정
                </div>{/* //.title */}
                <MypageList
                    leftContent={<p>진동알림</p>}
                    showToggle={true}
                    toggleValue={isVibrate}
                    onToggleChange={setIsVibrate}
                />
                <MypageList
                    leftContent={<p>채팅알림</p>}
                    showToggle={true}
                    toggleValue={isChat}
                    onToggleChange={setIsChat}
                />
            </div>{/* //.section */}
            <div className={mypageStyles.section}>
                <div className={mypageStyles.title}>
                    사용자 설정
                </div>{/* //.title */}
                <MypageList leftContent={<p>계정 관리</p>} to="" />
                <MypageList leftContent={<p>차단 사용자 관리</p>} to="" />
            </div>{/* //.section */}
            <div className={mypageStyles.section}>
                <div className={mypageStyles.title}>
                    기타
                </div>{/* //.title */}
                <MypageList leftContent={<p>캐시 데이터 삭제</p>}
                    onClick={() => setCacheModalOpen(true)} />
                <MypageList leftContent={<p>탈퇴하기</p>} to="" />
                <MypageList leftContent={<p>버전 25.25.7</p>} showArrow={false} />
            </div>{/* //.section */}

            <Modal
                isOpen={isCacheModalOpen}
                title="캐시 데이터 삭제"
                description={<>앱 내 모든 미디어 데이터를 삭제합니다.<br />
                    저장되지 않은 데이터는 복원할 수 없습니다.</>}
                confirmText="삭제하기"
                onConfirm={() => {
                    // 캐시 삭제 로직 (예: localStorage.clear() 등)
                    setCacheModalOpen(false);
                }}
                onCancel={() => setCacheModalOpen(false)}
            />
        </Layout>
    )
}
export default Setting;