import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; //로그인
import LoginEmail from "./pages/LoginEmail"; //이메일 로그인
import Home from "./pages/Home";  //홈
import GoodsCategory from "./pages/GoodsCategory"; //굿즈 카테고리
import GoodsDetail from "./pages/GoodsDetail"; //굿즈 상세보기
import GoodsUpload from "./pages/GoodsUpload"; //굿즈업로드
import Search from "./pages/Search"; //검색
import Chat from "./pages/Chat"; //챗
import ChatDetail from "./pages/ChatDetail"; //채팅상세
import Community from "./pages/Community"; //커뮤니티
import CommuDetail from "./pages/CommuDetail"; //커뮤니티 상세보기
import CommuUpload from "./pages/CommuUpload"; //커뮤니티업로드
import MyCommu from "./pages/MyCommu"; //내 커뮤니티
import Mypage from "./pages/Mypage"; //마이페이지
import MyDeals from "./pages/MyDeals"; //내 거래내역
import Liked from "./pages/Liked"; //찜
import Alarm from "./pages/Alarm"; //알림보기


import { CommuProvider } from "./context/CommuContext";

/* 수정 전 참고용 페이지들 */
import Upload from "./pages/Upload"; //업로드
import Edit from "./pages/Edit"; //수정
import Detail from "./pages/Detail"; //상세페이지
import Popular from "./pages/Popular"; //인기굿즈보기
import About from "./pages/About"; //소개
import { GoodsProvider } from "./context/GoodsContext";

function App() {
  return (

    <GoodsProvider>
      <CommuProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login/email" element={<LoginEmail />} />

          <Route path="/home" element={<Home />} />
          <Route path="/home/goodscategory/:id" element={<GoodsCategory />} />
          <Route path="/home/goodsdetail/:id" element={<GoodsDetail />} />
          <Route path="/home/goodsupload" element={<GoodsUpload />} />

          <Route path="/home/search" element={<Search />} />

          <Route path="/community" element={<Community />} />
          <Route path="/community/commudetail/:id" element={<CommuDetail />} />
          <Route path="/community/mycommu" element={<MyCommu />} />
          <Route path="/community/commuupload" element={<CommuUpload />} />

          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/chatdetail" element={<ChatDetail />} />

          <Route path="/mypage" element={<Mypage />} />
          <Route path="/liked" element={<Liked />} />
          <Route path="/mypage/alarm" element={<Alarm />} />
          <Route path="/mypage/mydeals" element={<MyDeals />} />



          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/about" element={<About />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </CommuProvider>
    </GoodsProvider>
  );
}

export default App;
