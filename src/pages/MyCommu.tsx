import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Commu } from "../types/commu";
import MultiTab from "../components/exchangebuy/MultiTab";
import Header from "../components/header/Header";
import style from "./MyCommu.module.css"
import MycommuItem from "../components/MycommuItem";
import MyCommentItem from "../components/MycommentItem";

const MyCommu = () => {
    const [myPostCount, setMyPostCount] = useState(0);
    const [myCommentCount, setMyCommentCount] = useState(0);
    const [myPosts, setMyPosts] = useState<Commu[]>([]);
    const [myComments, setMyComments] = useState<{ item: Commu, comment: any }[]>([]);
    const [commuList, setCommuList] = useState<Commu[]>([]);

    // 게시글 삭제
    const handleDeletePost = (id: string) => {
        const updated = commuList.filter(item => item.id !== id);
        setCommuList(updated);
        setMyPosts(updated.filter(item => item.userName === "뱃지가좋아"));
        setMyPostCount(updated.filter(item => item.userName === "뱃지가좋아").length); // ✅ 게시글 수 갱신
        localStorage.setItem('commuList', JSON.stringify(updated));
    };




    const loadMyData = async () => {
        const stored = localStorage.getItem("commuList");
        let data: Commu[] = [];

        if (stored) {
            data = JSON.parse(stored);
        } else {
            const res = await fetch('/data/commu.json');
            data = await res.json();
            localStorage.setItem("commuList", JSON.stringify(data));
        }

        const currentUser = "뱃지가좋아";

        const myPosts = data.filter(item => item.userName === currentUser);

        const myComments: { item: Commu, comment: any }[] = [];
        data.forEach(item => {
            if (Array.isArray(item.comments)) {
                item.comments.forEach(comment => {
                    if (comment.userName === currentUser) {
                        myComments.push({ item, comment });
                    }
                });
            }
        });

        setCommuList(data);
        setMyPosts(myPosts);
        setMyPostCount(myPosts.length);
        setMyComments(myComments);
        setMyCommentCount(myComments.length);
    };

    useEffect(() => {
        loadMyData();
    }, []);
    // 댓글 삭제
    const handleDeleteComment = (commentId: string) => {
        const updated = commuList.map(item => {
            const newComments = Array.isArray(item.comments)
                ? (item.comments as any[]).filter((c) => c.id !== commentId)
                : [];
            return {
                ...item,
                comments: newComments,
                commentsNum: newComments.length
            };
        });

        localStorage.setItem('commuList', JSON.stringify(updated));
        loadMyData(); // ✅ 이렇게 하면 전체 상태 갱신 일괄 처리됨
    };

   

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
                            <p className="subtit1" style={{ color: 'var(--point-deeppink)' }}>
                                {myPostCount}
                            </p>
                        </div>
                        <div className={style.counts}>
                            <p>
                                댓글 수
                            </p>
                            <p className="subtit1" style={{ color: 'var(--point-deeppink)' }}>
                                {myCommentCount}
                            </p>
                        </div>
                    </div>
                </div>{/* profilewrap */}
                <div className="mycon">
                    <MultiTab tabs={['내 게시글', '내 댓글']}>
                        {(activeIndex) => (
                            activeIndex === 0 ? (
                                <div style={{ padding: '0 var(--padding)' }}>
                                    {myPosts.map(item => (
                                        <MycommuItem key={item.id} item={item} onDelete={handleDeletePost} />
                                    ))}
                                </div>
                            ) : activeIndex === 1 ? (
                                <div style={{ padding: '0 var(--padding)' }}>
                                    {myComments.map(({ item, comment }) => (
                                        <MyCommentItem key={comment.id} item={item} comment={comment} onDelete={handleDeleteComment} />
                                    ))}
                                </div>
                            ) : null
                        )}
                    </MultiTab>
                </div>
            </div>
        </Layout>
    )

}

export default MyCommu;