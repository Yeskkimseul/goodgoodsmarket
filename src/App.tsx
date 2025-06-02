import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload"; //업로드
import Edit from "./pages/Edit"; //수정
import Detail from "./pages/Detail"; //상세페이지
import Liked from "./pages/Liked"; //찜한굿즈보기
import Popular from "./pages/Popular"; //인기굿즈보기
import About from "./pages/About"; //소개
import { GoodsProvider } from "./context/GoodsContext";

function App() {
  return (
    <GoodsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/about" element={<About />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </GoodsProvider>
  );
}

export default App;
