import Layout from "../components/Layout";
import Header from "../components/header/Header";
import formStyles from "./form.module.css";
import mypageStyles from "./Mypage.module.css";
import { useNavigate } from 'react-router-dom';
import MypageList from "../components/MypageList";

const Mypage = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Header type="type7"></Header>
            <div>
                <div className={mypageStyles.profile}>
                    <img src="/images/mypage/profile.png" alt="프로필사진" className={mypageStyles.profileImage} />
                    <div className={mypageStyles.right}>
                        <div className={mypageStyles.top}>
                            <h2 className={mypageStyles.name}>뱃지가 좋아</h2>
                            <div className={formStyles.button} onClick={() => navigate("#")}>프로필 관리</div>
                        </div>{/* //.top */}
                        <p>trust붙일자리</p>
                    </div>{/* //.right */}
                </div>{/* profile */}


                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        거래
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>거래내역</p>} to="/어디로갈지 링크걸기" />
                    <MypageList leftContent={<p>찜목록</p>} to="/어디로갈지 링크걸기" />
                    <MypageList leftContent={<p>최근 본 상품</p>} to="/어디로갈지 링크걸기" />
                </div>{/* //.section */}

                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        나의 굿굿
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>내 상품 관리</p>} to="/어디로갈지 링크걸기" />
                    <MypageList leftContent={<p>내 상점 후기</p>} to="/어디로갈지 링크걸기" />
                    <MypageList leftContent={<p>내 커뮤니티 관리</p>} to="/어디로갈지 링크걸기" />
                </div>{/* //.section */}

                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        굿굿 소식
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>굿굿마켓 소개</p>} to="/어디로갈지 링크걸기" />
                    <MypageList leftContent={<p>공지사항</p>} to="/어디로갈지 링크걸기" />
                    <MypageList leftContent={<p>이용안내</p>} to="/어디로갈지 링크걸기" />
                </div>{/* //.section */}

                <div className={mypageStyles.section}>
                    <div className={mypageStyles.title}>
                        고객지원
                    </div>{/* //.title */}
                    <MypageList leftContent={<p>앱 설정</p>} to="/어디로갈지 링크걸기" />
                    <MypageList leftContent={<p>고객센터</p>} to="/어디로갈지 링크걸기" />
                </div>{/* //.section */}

                <div className={mypageStyles.bottom}>
                    <h4>02-1234-5678</h4>
                    <h5>운영시간 10:00 - 18:00</h5>
                    <div className={formStyles.button} onClick={() => navigate("#")}>로그아웃</div>
                </div>
            </div>
        </Layout>
    )

}

export default Mypage;