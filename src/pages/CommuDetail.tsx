import Layout from "../components/Layout";
import Header from "../components/header/Header";
import style from "./CommuDetail.module.css"
import form from "./form.module.css"
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CommuBottomSheet from "../components/bottomsheet/CommuBottomSheet";
import MyListBottomSheet from "../components/bottomsheet/MyListBottomSheet";

interface commuType {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    likes: number;
    createdAt: string;
    views: number;
    tags: string[] | string;
    userimgUrl: string;
    userName: string;
    commentsNum: number;
    comments: any[];
}

const CommuDetail = () => {
    const navigate = useNavigate();

    const [isSheetOpen, setIsSheetOpen] = useState(false);
    // 날짜를 "몇 분/시간/일 전"으로 변환하는 함수
    function getTimeAgo(dateString: string) {
        const date = new Date(dateString);
        const now = new Date();
        const diff = (now.getTime() - date.getTime()) / 1000; // 초 단위

        if (diff < 60) return `${Math.floor(diff)}초 전`;
        if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
        if (diff < 2592000) return `${Math.floor(diff / 86400)}일 전`;
        if (diff < 31536000) return `${Math.floor(diff / 2592000)}달 전`;
        return `${Math.floor(diff / 31536000)}년 전`;
    }

    const { id } = useParams<{ id: string }>();
    const [commu, setcommu] = useState<commuType | null>(null);
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    useEffect(() => {
        if (commu) {
            // localStorage에서 좋아요 수 불러오기
            const commuLikes = JSON.parse(localStorage.getItem("commuLikes") || "{}");
            setLikes(commuLikes[commu.id] ?? commu.likes);

            // localStorage에서 좋아요 상태 불러오기
            const likedCommu = JSON.parse(localStorage.getItem("likedCommu") || "[]");
            setLiked(likedCommu.includes(commu.id));
        }
    }, [commu]);

    const handleLike = () => {
        if (!commu) return;
        const likedCommu = JSON.parse(localStorage.getItem("likedCommu") || "[]");
        let updatedLikedCommu;
        let newLiked;

        if (likedCommu.includes(commu.id)) {
            // 이미 좋아요면 취소
            updatedLikedCommu = likedCommu.filter((cid: string) => cid !== commu.id);
            setLikes(prev => prev - 1);
            newLiked = false;
        } else {
            // 좋아요 추가
            updatedLikedCommu = [...likedCommu, commu.id];
            setLikes(prev => prev + 1);
            newLiked = true;
        }
        localStorage.setItem("likedCommu", JSON.stringify(updatedLikedCommu));
        setLiked(newLiked);

        // 좋아요 수를 localStorage에도 저장 (commuLikes: { [id]: likes })
        const commuLikes = JSON.parse(localStorage.getItem("commuLikes") || "{}");
        commuLikes[commu.id] = newLiked ? likes + 1 : likes - 1;
        localStorage.setItem("commuLikes", JSON.stringify(commuLikes));
    };



    useEffect(() => {
        fetch("/data/commu.json")
            .then(res => res.json())
            .then((data: commuType[]) => {
                const found = data.find(item => item.id === id);
                setcommu(found ?? null);
            });
    }, [id]);

    const handleDelete = () => {
        // localStorage에서 myCommuList 불러오기
        const commuList = JSON.parse(localStorage.getItem("myCommuList") || "[]");
        // 현재 글 id와 다른 것만 남김
        const updated = commuList.filter((item: commuType) => item.id !== commu?.id);
        // localStorage에 다시 저장
        localStorage.setItem("myCommuList", JSON.stringify(updated));
        setIsSheetOpen(false);
        alert("게시글이 삭제되었습니다.");
        navigate(-1);
    };



    if (!commu) return <div>로딩 중...</div>;



    return (
        <Layout>
            <Header type="type1" title="커뮤니티" />
            <div className={style.con}>
                <div className={style.titlecon}>
                    <div className={style.categories}>
                        {commu.category}
                    </div>
                    <h2 className={style.title}>
                        {commu.title}
                    </h2>
                    <div className={style.bottomaria}>
                        <div className={style.profilearia}>
                            <div className={style.profile}>
                                <img src={commu.userimgUrl} className={style.userimg} />
                                <h4 className={commu.userName}>
                                    {commu.userName}
                                </h4>
                            </div>{/* profile */}
                            <ul className={style.bottomprofile}>
                                <li className={style.time}>
                                    {getTimeAgo(commu.createdAt)}
                                </li>
                                <li className={style.icontext}>
                                    <img src="/images/icon/eye_small.svg" alt="view" />
                                    {commu.views}
                                </li>
                                <li className={style.icontext}>
                                    <img src="/images/icon/comment_small.svg" alt="comment" />
                                    {commu.commentsNum}
                                </li>
                            </ul>{/* bottomprofile */}
                        </div>{/* profilearia */}
                        <img
                            src="/images/icon/more_vertical.svg"
                            alt="more"
                            className={style.more}
                            onClick={() => setIsSheetOpen(true)}
                        />
                    </div>
                </div>{/* titlecon */}
                <div className={style.articlecon}>
                    <img src={commu.imageUrl} alt={commu.title} className={style.articleimg} />
                    <p className="body2">
                        {commu.description}
                    </p>
                    <div className={style.tags}>
                        {Array.isArray(commu.tags)
                            ? commu.tags.map((tag, i) => <span key={i}>{tag}</span>)
                            : commu.tags}
                    </div>
                    <div
                        className={`${style.liketn} ${liked ? style.likedon : ""}`}
                        onClick={handleLike}
                        style={{ cursor: "pointer" }}
                    >
                        <img
                            src={
                                liked
                                    ? "/images/icon/heart_small_white_fill.svg"
                                    : "/images/icon/heart_small_grey_empty.svg"
                            }
                            alt="좋아요"
                        />
                        {likes} 좋아요
                    </div>
                </div>{/* articlecon */}
                <div className={style.commentcon}>
                    <h4>
                        댓글 {commu.commentsNum}
                    </h4>
                    <div className={style.inputcon}>
                        <input className={form.input} />
                        <button className={form.button_sm}>등록</button>
                    </div>
                    <div className={style.commentlist}>
                        {/* 댓글 출력 예시 */}
                        {commu.comments && commu.comments.map((c) => (
                            <div key={c.id}>
                                <img src={c.userimgUrl} alt={c.userName} />
                                <span>{c.userName}</span>
                                <span>{c.content}</span>
                                <span>{c.createdAt}</span>
                            </div>
                        ))}
                    </div>
                </div>{/* commentcon */}
            </div>{/* con */}

            {/* 바텀시트 조건 분기 */}
            {commu.userName === "뱃지가좋아" ? (
                <MyListBottomSheet
                    isOpen={isSheetOpen}
                    onClose={() => setIsSheetOpen(false)}
                    onDelete={handleDelete}
                />
            ) : (
                <CommuBottomSheet
                    isOpen={isSheetOpen}
                    onClose={() => setIsSheetOpen(false)}
                />
            )}
        </Layout>
    )

}

export default CommuDetail;