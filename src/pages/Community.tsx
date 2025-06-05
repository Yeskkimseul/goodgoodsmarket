import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Commu } from "../types/commu";
import CommuCard from "../components/CommuCard";
import styles from './CardListLayout.module.css';
import commustyles from './CommuList.module.css';
import filterstyles from './filter.module.css';
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

    // 필터링/정렬 로직
    const filteredList = commuList.filter(item => {
        if (filter === '굿즈 소식') return item.category === '굿즈 소식';
        if (filter === '굿즈 자랑') return item.category === '굿즈 자랑';
        if (filter === '자유게시판') return item.category === '자유게시판';
        return true;
    });
    const sortedList = filter === '추천'
        ? [...filteredList].sort((a, b) => b.views - a.views)
        : filter === '인기'
            ? [...filteredList].sort((a, b) => b.likes - a.likes)
            : filteredList;

    return (
        <Layout>
            <Header type="type7" />
            <div className={commustyles.inner}>
            <div className={filterstyles.filterContainer}>
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
                {
                    sortedList.map((item) => (
                        <CommuCard
                            key={item.id}
                            item={item}
                            className={styles.card}
                        />
                    ))
                }
                <MainMoreBtn
                    popupContent={({ close }: { close: () => void }) => (
                        <>
                            <button
                                onClick={() => {
                                    navigate("/community/commuupload");
                                    close();
                                }}
                            >
                                게시글 등록
                            </button>
                            <button
                                onClick={() => {
                                    navigate("/community/mycommu");
                                    close();
                                }}
                            >
                                내 등록글 보기
                            </button>
                            <button onClick={close}>닫기</button>
                        </>
                    )}
                />
            </div>
        </Layout>
    )

}

export default Community;