import { Routes, Route, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";
import ScrollToTop from "./components/ScrollToTop";

import Login from "./pages/Login"; //로그인
import LoginEmail from "./pages/LoginEmail"; //이메일 로그인
import LoginPhone from "./pages/LoginPhone"; //휴대폰 로그인
import LoginFindPassword from "./pages/LoginFindPassword";//패스워드찾기
import LoginFindId from "./pages/LoginFindId"; //계정찾기
import LoginFindIdResult from "./pages/LoginFindIdResult"; //계정찾음
import Join from "./pages/Join"; //회원가입
import Home from "./pages/Home";  //홈
import GoodsCategory from "./pages/GoodsCategory"; //굿즈 카테고리
import GoodsDetail from "./pages/GoodsDetail"; //굿즈 상세보기
import GoodsUpload from "./pages/GoodsUpload"; //굿즈업로드
import GoodsEdit from "./pages/GoodsEdit"; //굿즈수정
import Search from "./pages/Search"; //검색
import Chat from "./pages/Chat"; //챗
import ChatDetail from "./pages/ChatDetail"; //채팅상세
import Community from "./pages/Community"; //커뮤니티
import CommuDetail from "./pages/CommuDetail"; //커뮤니티 상세보기
import CommuUpload from "./pages/CommuUpload"; //커뮤니티업로드
import CommuEdit from "./pages/CommuEdit"; //커뮤니티수정
import MyCommu from "./pages/MyCommu"; //내 커뮤니티
import Mypage from "./pages/Mypage"; //마이페이지
import MyDeals from "./pages/MyDeals"; //내 거래내역
import MyReview from "./pages/MyReview"; //내 후기
import Lately from "./pages/Lately";//최근 본 상품
import ProfileSetting from "./pages/ProfileSetting";
import Transactional from "./pages/Transactional"; //거래내역
import Setting from "./pages/Setting"; //앱 설정
import WriteReview from "./pages/WriteReview";//리뷰 작성
import Liked from "./pages/Liked"; //찜
import Alarm from "./pages/Alarm"; //알림보기
import Notice from "./pages/Notice"; //공지사항
import Help from "./pages/Help"; //도움센터


import { GoodsProvider } from "./context/GoodsContext";
import { CommuProvider } from "./context/CommuContext";
import { ReviewProvider } from "./context/ReviewContext";
import { ChatProvider } from "./context/ChatContext";

/* 수정 전 참고용 페이지들 */
import Upload from "./pages/Upload"; //업로드
import Popular from "./pages/Popular"; //인기굿즈보기
import About from "./pages/About"; //소개



// import ChatbaseWidget from "./components/ChatbaseWidget";


function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  useEffect(() => {
    function hideChatbaseWithRetry(shouldHide: boolean, retry = 0) {
      const chatbaseButton = document.querySelector('#chatbase-bubble-button') as HTMLElement | null;
      if (chatbaseButton) {
        chatbaseButton.style.display = shouldHide ? 'none' : 'block';
        if (shouldHide) {
          const bubble = document.querySelector(".chatbase-bubble-container");
          if (bubble) bubble.remove();
          const iframe = document.querySelector('iframe[src*="chatbase.co"]');
          if (iframe) iframe.remove();
        }
      } else if (retry < 20) {
        setTimeout(() => hideChatbaseWithRetry(shouldHide, retry + 1), 100);
      }
    }

    const path = location.pathname.toLowerCase();
    const shouldHideChatbase =
      path === "/" ||
      path === "" ||
      path.startsWith("/mypage") ||
      path.startsWith("/login") ||
      path.startsWith("/join") ||
      path.startsWith("/home/goodscategory") ||
      path.startsWith("/home/goodsdetail") ||
      path.startsWith("/home/goodsupload") ||
      path.startsWith("/community/commudetail") ||
      path.startsWith("/community/mycommu") ||
      path.startsWith("/community/commuupload") ||
      (path.startsWith("/chat") && path !== "/chat") ||
      path === "/liked" ||
      path.startsWith("/writereview") ||
      path.startsWith("/about");
    hideChatbaseWithRetry(shouldHideChatbase);
  }, [location.pathname]);

  useEffect(() => {
    setTimeout(() => {
      const chatbaseButton = document.querySelector('#chatbase-bubble-button') as HTMLElement | null;
      if (chatbaseButton) chatbaseButton.style.display = 'none';
      const bubble = document.querySelector(".chatbase-bubble-container");
      if (bubble) bubble.remove();
      const iframe = document.querySelector('iframe[src*="chatbase.co"]');
      if (iframe) iframe.remove();
    }, 300);
  }, []);




  return (
    <>
      <ScrollToTop />
      <GoodsProvider>
        <CommuProvider>
          <ReviewProvider>
            <ChatProvider>
              {/* ✅ 조건부 삽입 */}
              {/* <>
          {loading ? <SplashScreen /> : <Login />}
        </> */}
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login/email" element={<LoginEmail />} />
                <Route path="/login/phone" element={<LoginPhone />} />
                <Route path="/login/findpassword" element={<LoginFindPassword />} />
                <Route path="/login/findid" element={<LoginFindId />} />
                <Route path="/login/findidresult" element={<LoginFindIdResult />} />

                <Route path="/join" element={<Join />} />

                <Route path="/home" element={
                  <Home />} />
                <Route path="/home/goodscategory/:id" element={<GoodsCategory />} />
                <Route path="/home/goodsdetail/:id" element={<GoodsDetail />} />
                <Route path="/home/goodsupload" element={<GoodsUpload />} />


                <Route path="/home/search" element={<Search />} />

                <Route path="/community" element={
                  <Community />
                } />
                <Route path="/community/commudetail/:id" element={

                  <CommuDetail />

                } />
                <Route path="/community/mycommu" element={

                  <MyCommu />

                } />
                <Route path="/community/commuupload" element={

                  <CommuUpload />

                } />
                <Route path="/community/commuedit/:id" element={<CommuEdit />} />

                <Route path="/chat" element={

                  <Chat />

                } />
                {/* <Route path="/chat/chatdetail/:id" element={<ChatDetail />} /> */}
                <Route path="/chat/:id" element={<ChatDetail />} />

                <Route path="/mypage" element={<Mypage />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/mypage/alarm" element={<Alarm />} />
                <Route path="/mypage/mydeals" element={<MyDeals />} />
                <Route path="/mypage/myreview" element={<MyReview />} />
                <Route path="/mypage/setting" element={<Setting />} />
                <Route path="/mypage/profile" element={<ProfileSetting />} />
                <Route path="/writereview" element={<WriteReview />} />
                <Route path="/mypage/lately" element={<Lately />} />
                <Route path="/mypage/transactional" element={<Transactional />} />
                <Route path="/mypage/goodsedit/:id" element={<GoodsEdit />} />
                <Route path="/mypage/notice" element={<Notice />} />
                <Route path="/mypage/help" element={<Help />} />
                {/* 수정 전 참고용 페이지들 */}

                <Route path="/popular" element={<Popular />} />
                <Route path="/about" element={<About />} />
                <Route path="/upload" element={<Upload />} />
              </Routes>
            </ChatProvider>
          </ReviewProvider>
        </CommuProvider>
      </GoodsProvider>
    </>
  );
}

export default App;
