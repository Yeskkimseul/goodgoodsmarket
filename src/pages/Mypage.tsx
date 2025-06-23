import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import formStyles from "./form.module.css";
import mypageStyles from "./Mypage.module.css";
import { useNavigate } from 'react-router-dom';
import MypageList from "../components/MypageList";
import Trust from "../components/Trust";
import Modal from "../components/Modal";

const Mypage = () => {
    const navigate = useNavigate();
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
    const myTrust = 85;
    return (
        <Layout>
            <Header type="type7"></Header>
            <div>
                <div className={mypageStyles.profile}>
                    <img src="/images/mypage/profile.png" alt="프로필사진" className={mypageStyles.profileImage} />
                    <div className={mypageStyles.right}>
                        <h3 className={mypageStyles.name}>뱃지가좋아</h3>
                        <div className={`${formStyles.button_big} ${formStyles.width40}`} onClick={() => navigate("/mypage/profile")}>프로필 관리</div>

                    </div>{/* //.right */}
                </div>{/* profile */}
                <Trust trust={myTrust} />

                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        거래
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>거래내역</p>} onClick={() => navigate('/mypage/transactional')} />
                    <MypageList leftContent={<p>관심목록</p>}
                        onClick={() => navigate("/liked", { state: { tab: 0 } })} />
                    <MypageList leftContent={<p>최근 본 상품</p>} to="/mypage/lately" />
                </div>{/* //.section */}

                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        나의 굿굿
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>내 상품 관리</p>} to="/mypage/mydeals" />
                    <MypageList leftContent={<p>내 상점 후기</p>} to="/mypage/myreview" />
                    <MypageList leftContent={<p>내 커뮤니티 관리</p>} to="/community/mycommu" />
                </div>{/* //.section */}

                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        굿굿 소식
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>굿굿마켓 소개</p>} to="/about" />
                    <MypageList leftContent={<p>공지사항</p>} to="/mypage/notice" />
                </div>{/* //.section */}

                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        고객지원
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>앱 설정</p>} to="/mypage/setting" />
                    <MypageList leftContent={<p>도움센터</p>} to="/mypage/help" />
                </div>{/* //.section */}

                <div className={mypageStyles.bottom}>
                    <h4>02-1234-5678</h4>
                    <h5>운영시간 10:00 - 18:00</h5>
                    <div className={`${formStyles.button_big} ${formStyles.width30}`} onClick={() => setLogoutModalOpen(true)}>로그아웃</div>
                </div>
            </div>
            <Modal
                isOpen={isLogoutModalOpen}
                title="로그아웃"
                description={<>
                    정말 로그아웃할까요?
                </>}
                confirmText="로그아웃"
                onConfirm={() => {
                    navigate("/");
                    setLogoutModalOpen(false);
                }}
                onCancel={() => setLogoutModalOpen(false)}
            />
        </Layout>
    );

};

export default Mypage;