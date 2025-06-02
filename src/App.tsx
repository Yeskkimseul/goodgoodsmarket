import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"; //로그인
import Home from "./pages/Home";  //홈
import GoodsCategory from "./pages/GoodsCategory"; //굿즈 카테고리
import GoodsDetail from "./pages/GoodsDetail"; //굿즈 상세보기
import GoodsUpload from "./pages/GoodsUpload"; //굿즈업로드
import Chat from "./pages/Chat"; //챗
import ChatDetail from "./pages/ChatDetail"; //채팅상세
import Community from "./pages/Community"; //커뮤니티
import CommuDetail from "./pages/CommuDetail"; //커뮤니티 상세보기
import CommuUpload from "./pages/CommuUpload"; //커뮤니티업로드
import Mypage from "./pages/Mypage"; //마이페이지
import Liked from "./pages/Liked"; //찜


import Upload from "./pages/Upload"; //업로드
import Edit from "./pages/Edit"; //수정
import Detail from "./pages/Detail"; //상세페이지
import Popular from "./pages/Popular"; //인기굿즈보기
import About from "./pages/About"; //소개
import { GoodsProvider } from "./context/GoodsContext";

function App() {
  return (

    <GoodsProvider>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/home" element={<Home />} />
         <Route path="/community" element={<Community />} />
         <Route path="/goodscategory/:id" element={<GoodsCategory />} />
         <Route path="/goodsdetail/:id" element={<GoodsDetail />} />
        <Route path="/goodsupload" element={<GoodsUpload />} />
         <Route path="/chat" element={<Chat />} />
        <Route path="/chatdetail" element={<ChatDetail />} />
         <Route path="/mypage" element={<Mypage />} />
         <Route path="/commudetail/:id" element={<CommuDetail />} />
        <Route path="/commuupload" element={<CommuUpload />} />
        <Route path="/liked" element={<Liked />} />


        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </GoodsProvider>
  );
}

export default App;
