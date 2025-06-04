import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Commu } from "../types/commu";
import CommuCard from "../components/CommuCard";
import styles from './CardListLayout.module.css';
import MainMoreBtn from "../components/MainMoreBtn";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";

const Community = () => {

    //커뮤니티 리스트 상태 추가
    const [commuList, setCommuList] = useState<Commu[]>([]);
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

    return (
        <Layout>
            <Header type="type7"></Header>
            <div>
                {
                    commuList.map((item) => (
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