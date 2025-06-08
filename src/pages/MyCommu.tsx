import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Commu } from "../types/commu";
import Tab from "../components/exchangebuy/Tab";
import Header from "../components/header/Header";
import style from "./MyCommu.module.css"

const MyCommu = () => {
    const [myPostCount, setMyPostCount] = useState(0);
    const [myCommentCount, setMyCommentCount] = useState(0);

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
                   
                </div>
            </div>
        </Layout>
    )

}

export default MyCommu;