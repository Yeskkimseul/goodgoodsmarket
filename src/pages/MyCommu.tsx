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
        localStorage.setItem('commuList', JSON.stringify(updated));
    };

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
        setCommuList(updated);

        // 내 댓글만 다시 모으기
        const comments: { item: Commu, comment: any }[] = [];
        updated.forEach(item => {
            if (Array.isArray(item.comments)) {
                (item.comments as any[]).forEach(comment => {
                    if (comment.userName === "뱃지가좋아") {
                        comments.push({ item, comment });
                    }
                });
            }
        });
        setMyComments(comments);
        setMyCommentCount(comments.length);
        localStorage.setItem('commuList', JSON.stringify(updated));
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
                setCommuList(data);
            });
    }, []);

    useEffect(() => {
        fetch('/data/commu.json')
            .then(res => res.json())
            .then((data: Commu[]) => {
                // ...기존 게시글/댓글 수 코드...
                // 내 댓글만 모으기
                const comments: { item: Commu, comment: any }[] = [];
                data.forEach(item => {
                    if (item.comments && Array.isArray(item.comments)) {
                        item.comments.forEach(comment => {
                            if (comment.userName === "뱃지가좋아") {
                                comments.push({ item, comment });
                            }
                        });
                    }
                });
                setMyComments(comments);
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
                                <div style={{padding: '0 var(--padding)'}}>
                                    {myPosts.map(item => (
                                        <MycommuItem key={item.id} item={item} onDelete={handleDeletePost} />
                                    ))}
                                </div>
                            ) : activeIndex === 1 ? (
                                <div style={{padding: '0 var(--padding)'}}>
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