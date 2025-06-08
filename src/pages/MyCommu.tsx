import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Commu } from "../types/commu";
import MultiTab from "../components/exchangebuy/MultiTab";
import Header from "../components/header/Header";
import style from "./MyCommu.module.css"
import MycommuItem from "../components/MycommuItem";

const MyCommu = () => {
    const [myPostCount, setMyPostCount] = useState(0);
    const [myCommentCount, setMyCommentCount] = useState(0);
    const [myPosts, setMyPosts] = useState<Commu[]>([]);

    //게시글 삭제 로직직
    const handleDelete = (id: string) => {
        setMyPosts(prev => {
            const updated = prev.filter(item => item.id !== id);
            // localStorage 동기화 (선택)
            localStorage.setItem('commuList', JSON.stringify(updated));
            return updated;
        });
    };

    useEffect(() => {
        fetch('/data/commu.json')
            .then(res => res.json())
            .then((data: Commu[]) => {
                // 게시글 수
                const postCount = data.filter(item => item.userName === "뱃지가좋아").length;
                // 댓글 수
                const commentCount = data.reduce((acc, item) => {
                    if (item.comments && Array.isArray(item.comments)) {
                        return acc + item.comments.filter(c => c.userName === "뱃지가좋아").length;
                    }
                    return acc;
                }, 0);
                setMyPostCount(postCount);
                setMyCommentCount(commentCount);
                // 내 게시글 목록 저장
                setMyPosts(data.filter(item => item.userName === "뱃지가좋아"));
            });
    }, []);



    return (
        <Layout>
            <Header type='type1' title="내가 쓴 글" />
            <div className={style.mycommuwrap}>
                <div className={style.profilewrap}>
                    <div className={style.profile}>
                        <img src="/images/mypage/profile.png" className={style.profileimg} />
                        <p className="subtit2">
                            뱃지가좋아
                        </p>
                    </div>
                    <div className={style.count}>
                        <div className={style.counts}>
                            <p>
                                게시글 수
                            </p>
                            <p className=".subtit1" style={{ color: 'var(--point-deeppink)' }}>
                                {myPostCount}
                            </p>
                        </div>
                        <div className={style.counts}>
                            <p>
                                댓글 수
                            </p>
                            <p className=".subtit1" style={{ color: 'var(--point-deeppink)' }}>
                                {myCommentCount}
                            </p>
                        </div>
                    </div>
                </div>{/* profilewrap */}
                <div className="mycon">
                    <MultiTab tabs={['내 게시글', '내 댓글']}>
                        {(activeIndex) => (
                            activeIndex === 0 ? (
                                <div>
                                    {myPosts.map(item => (
                                        <MycommuItem key={item.id} item={item} onDelete={handleDelete} />
                                    ))}
                                </div>
                            ) : activeIndex === 1 ? (
                                <div>내 댓글 내용</div>
                            ) : null
                        )}
                    </MultiTab>
                </div>
            </div>
        </Layout>
    )

}

export default MyCommu;