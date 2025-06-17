import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Commu } from "../types/commu";
import CommuCard from "../components/CommuCard";
import styles from './CardListLayout.module.css';
// import commustyles from './CommuList.module.css';
import filterstyles from './filter.module.css';
import morestyles from '../components/MainMoreBtn.module.css';
import MainMoreBtn from "../components/MainMoreBtn";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";


const Community = () => {


    //커뮤니티 리스트 상태 추가
    const [commuList, setCommuList] = useState<Commu[]>([]);
    const [filter, setFilter] = useState<string>('추천');
    const filterList = [
        { label: '추천', value: '추천' },
        { label: '인기', value: '인기' },
        { label: '굿즈 소식', value: '굿즈 소식' },
        { label: '굿즈 자랑', value: '굿즈 자랑' },
        { label: '자유게시판', value: '자유게시판' },
    ];
    const navigate = useNavigate();
    const goToDetail = (id: number) => {
        navigate(`/chat/chatdetail/${id}`);
    };

    useEffect(() => {
        const stored = localStorage.getItem('commuList'); //저장된 커뮤니티 데이터
        if (stored) {
            setCommuList(JSON.parse(stored)); //로컬 스토리지에 있으면 그걸 쓰고
        }
        else {
            //커뮤니티 데이터 불러오기
            fetch('data/commu.json')
                .then((res) => res.json())
                .then((data) => setCommuList(data));
        }
    }, []);

    const blockedUsers = JSON.parse(localStorage.getItem("blockedUsers") || "[]");
    // 1. 차단 유저 제외
    const visibleList = commuList.filter(item => !blockedUsers.includes(item.userName));
    // 필터링/정렬 로직

    // 2. 카테고리 필터링
    const filteredList = visibleList.filter(item => {
        if (filter === '굿즈 소식') return item.category === '굿즈 소식';
        if (filter === '굿즈 자랑') return item.category === '굿즈 자랑';
        if (filter === '자유게시판') return item.category === '자유게시판';
        return true;
    });

    // 3. 정렬
    const sortedList = filter === '추천'
        ? [...filteredList].sort((a, b) => b.views - a.views)
        : filter === '인기'
            ? [...filteredList].sort((a, b) => b.likes - a.likes)
            : filteredList;



    
    return (
        <Layout>
            <Header type="type7" />
            <div>
                <div className={filterstyles.filterContainer} style={{ position: "fixed", maxWidth: "1200px", width: "100%" }}>
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
                <div style={{ padding: 'clamp(54px,7.5vh,57px) var(--padding)' }}>
                    {
                        sortedList.map((item) => (
                            <CommuCard
                                key={item.id}
                                item={item}
                                className={styles.card}
                            />
                        ))
                    }

                </div>
                <MainMoreBtn
                    popupContent={({ close }: { close: () => void }) => (
                        <div>
                            <button
                                className={morestyles.writeBtn}
                                onClick={() => {
                                    navigate("/community/commuupload");
                                    close();
                                }}
                            >
                                <img
                                    src="../../../images/icon/edit_medium.svg"
                                    alt="게시글등록"
                                />
                                게시글 등록
                            </button>
                            <button
                                className={morestyles.viewBtn}
                                onClick={() => {
                                    navigate("/community/mycommu");
                                    close();
                                }}
                            >
                                <img
                                    src="../../../images/icon/book_medium.svg"
                                    alt="내등록글보기"
                                />
                                내가 쓴 글
                            </button>
                            <button
                                className={morestyles.closeBtn}
                                onClick={close}>

                                <img
                                    src="../../../images/icon/x_medium.svg"
                                    alt="닫기"
                                />
                                닫기
                            </button>
                        </div>
                    )}
                />

            </div>
        </Layout>
    )

}

export default Community;