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
    /* 좋아요 버튼 상태와 수 */
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    // 댓글별 좋아요 상태와 수를 관리
    const [commentLikes, setCommentLikes] = useState<{ [key: string]: number }>({});
    const [commentLiked, setCommentLiked] = useState<{ [key: string]: boolean }>({});
    /* 댓글 입력 상태 */
    const [commentInput, setCommentInput] = useState("");

    /* 좋아요 버튼 */
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

    /* 댓글 좋아요 값 불러오기 */
    useEffect(() => {
        if (commu && commu.comments) {
            // 좋아요 수
            const storedLikes = JSON.parse(localStorage.getItem("commentLikes") || "{}");
            // 좋아요 상태
            const storedLiked = JSON.parse(localStorage.getItem("commentLiked") || "{}");
            const likesObj: { [key: string]: number } = {};
            const likedObj: { [key: string]: boolean } = {};
            commu.comments.forEach((c: any) => {
                likesObj[c.id] = storedLikes[c.id] ?? c.commentlikes ?? 0;
                likedObj[c.id] = storedLiked[c.id] ?? false;
            });
            setCommentLikes(likesObj);
            setCommentLiked(likedObj);
        }
    }, [commu]);

    /* 토글 코멘트 좋아요 */
    const handleCommentLike = (commentId: string) => {
        setCommentLiked(prev => {
            const newLiked = !prev[commentId];
            // 상태 업데이트
            const updated = { ...prev, [commentId]: newLiked };
            // localStorage 저장
            localStorage.setItem("commentLiked", JSON.stringify(updated));
            return updated;
        });

        setCommentLikes(prev => {
            const newCount = commentLiked[commentId]
                ? (prev[commentId] || 0) - 1
                : (prev[commentId] || 0) + 1;
            const updated = { ...prev, [commentId]: newCount };
            // localStorage 저장
            localStorage.setItem("commentLikes", JSON.stringify(updated));
            return updated;
        });
    };

    /* 본문 좋아요 토글 */
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

    /* 내 글 삭제 */
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


    useEffect(() => {
        // 1. localStorage에서 commuList 불러오기
        const stored = localStorage.getItem("commuList");
        if (stored) {
            const commuList = JSON.parse(stored);
            const found = commuList.find((item: commuType) => item.id === id);
            setcommu(found ?? null);
        } else {
            // 2. 없으면 commu.json에서 불러오기
            fetch("/data/commu.json")
                .then(res => res.json())
                .then((data: commuType[]) => {
                    const found = data.find(item => item.id === id);
                    setcommu(found ?? null);
                });
        }
    }, [id]);

    useEffect(() => {
        if (!commu || !commu.id) return;

        const viewedKey = `commu_viewed_${commu.id}`;
        if (sessionStorage.getItem(viewedKey)) return;

        const newViews = (commu.views || 0) + 1;

        // localStorage의 commuList 업데이트
        const stored = localStorage.getItem("commuList");
        if (stored) {
            const commuList = JSON.parse(stored);
            const updatedList = commuList.map((item: commuType) =>
                item.id === commu.id ? { ...item, views: newViews } : item
            );
            localStorage.setItem("commuList", JSON.stringify(updatedList));

            // 업데이트된 commu 객체로 setcommu
            const updated = updatedList.find((item: commuType) => item.id === commu.id);
            if (updated) setcommu(updated);
        } else {
            // commu만 업데이트
            setcommu(prev => prev ? { ...prev, views: newViews } : prev);
        }

        sessionStorage.setItem(viewedKey, "1");
    }, [commu?.id]);



    /* 로컬스토리지의 태그 불러오기 */
    const storedTags = JSON.parse(localStorage.getItem('commuTags') || '{}');
    const tagsToShow =
        commu && storedTags[commu.id]
            ? storedTags[commu.id]
            : commu && Array.isArray(commu.tags)
                ? commu.tags
                : commu && typeof commu.tags === 'string'
                    ? [commu.tags]
                    : [];


    const [comments, setComments] = useState<any[]>([]);  // 항상 호출

    useEffect(() => {
        if (commu) {
            const stored = JSON.parse(localStorage.getItem("comments") || "{}");
            const loadedComments = stored[commu.id] || commu.comments || [];
            setComments(loadedComments);
        }
    }, [commu]);

    const handleCommentSubmit = () => {
        if (!commentInput.trim() || !commu) return;

        const newComment = {
            id: `c-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
            userimgUrl: "/images/users/user1.png",
            userName: "뱃지가좋아",
            content: commentInput,
            createdAt: new Date().toISOString(),
        };

        const updatedComments = [...comments, newComment]; // ✅ 기존 상태 기반 추가

        const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
        storedComments[commu.id] = updatedComments;
        localStorage.setItem("comments", JSON.stringify(storedComments));

        setComments(updatedComments);
        setcommu({
            ...commu,
            commentsNum: updatedComments.length,
        });

        setCommentInput("");
    };


    /* 로컬스토리지에 저장된 코멘트 우선 적용 */
    const storedComments = JSON.parse(localStorage.getItem("comments") || "{}");
    const commentsToShow = commu ? (storedComments[commu.id] ?? []) : [];
    const commentsCount = comments.length;

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
                                    {commentsCount}
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
                    {commu.imageUrl && (
                        <img
                            src={commu.imageUrl}
                            alt={commu.title}
                            className={style.articleimg}
                        />
                    )}
                    <p className="body2">
                        {commu.description}
                    </p>
                    <div className={style.tags}>
                        {tagsToShow.map((tag: string, i: number) => <span key={i}>{tag}</span>)}
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
                        댓글 {commentsCount}
                    </h4>
                    <div className={style.inputcon}>
                        <input
                            className={form.input}
                            style={{ flex: '3.5' }}
                            value={commentInput}
                            onChange={e => setCommentInput(e.target.value)}
                        />
                        <button className={form.button_sm} onClick={handleCommentSubmit}>등록</button>
                    </div>
                    <div className={style.commentlist}>
                        {/* 댓글 출력 예시 */}
                        {comments.map((c: any) => (
                            <div key={c.id} className={style.commentitem}>
                                <div className={style.cUser}>
                                    <img src={c.userimgUrl} alt={c.userName} className={style.cUserimg} />
                                    <h4>{c.userName}</h4>
                                </div>
                                <div className={style.commentin}>
                                    <span className="body2">{c.content}</span>
                                    <div className={style.commentbottom}>
                                        <span> {getTimeAgo(c.createdAt)}  </span>
                                        <div
                                            className={`${style.cIcontext} ${commentLiked[c.id] ? style.cIcontexton : ""}`}
                                            onClick={() => handleCommentLike(c.id)}
                                            style={{ cursor: "pointer" }}
                                        >
                                            <img
                                                src={
                                                    commentLiked[c.id]
                                                        ? "/images/icon/heart_small_mint_fill.svg"
                                                        : "/images/icon/heart_small_grey_empty.svg"
                                                }
                                                alt="좋아요"
                                            />
                                            <p className={style.commentlike}>{commentLikes[c.id] ?? c.commentlikes ?? 0} 좋아요</p>
                                        </div>
                                    </div>
                                </div>
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
                    onEdit={() => navigate(`/community/commuedit/${commu.id}`)}
                />
            ) : (
                <CommuBottomSheet
                    isOpen={isSheetOpen}
                    onClose={() => setIsSheetOpen(false)}
                    userName={commu.userName}
                />
            )}
        </Layout>
    )

}

export default CommuDetail;