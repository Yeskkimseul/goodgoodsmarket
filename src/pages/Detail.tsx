import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Goods } from "../types";
import styles from "./form.module.css"
import Layout from "../components/Layout";

const Detail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [goods, setGoods] = useState<Goods | null>(null); //기본값 null
    const [inputPw, setInputPw] = useState('');
    const [pwMatched, setPwMatched] = useState(false); //비밀번호 일치 여부

    //로컬 스토리지에서 굿즈 정보 불러오기
    useEffect(() => {
        const data = localStorage.getItem('goodsList');
        if (data) {
            const list: Goods[] = JSON.parse(data);
            const found = list.find((g) => g.id === id);
            if (found) setGoods(found);
        }
    }, [id]);

    //비밀번호 확인
    const handleCheckPassword = () => {
        if (inputPw === goods?.password) { //?. ->옵셔널 체이닝 문법 / goods의 값과 일치하지않는 경우 null값을 안전하게 반환함 
            setPwMatched(true);
        } else {
            alert('비밀번호가 틀렸습니다.');
        }

    }

    //배열 형태의 localStorage에서 특정 ID를 제거 하는 함수
    const removeIdFromStorageArray = (key: string, id: string) => {
        const data = localStorage.getItem(key);
        if (data) {
            const arr: string[] = JSON.parse(data);
            const updated = arr.filter(itemId => itemId !== id);
            localStorage.setItem(key, JSON.stringify(updated));
        }
    }

    //삭제처리
    const handleDelete = () => {
        if (!goods) return;
        const data = localStorage.getItem('goodsList');
        if (data) {
            const list: Goods[] = JSON.parse(data);
            const updated = list.filter((g) => g.id !== goods.id);
            localStorage.setItem('goodsList', JSON.stringify(updated));
            //좋아요 관련 키 모두 한번에 처리
            removeIdFromStorageArray('likedGoods', goods.id);
            removeIdFromStorageArray('likes', goods.id);
            navigate('/');
        }
    }

    return (
        <Layout>
            {
                goods ? (
                    <div style={{ padding: '40px 0' }}>
                        {/* 이미지가 있을 경우 미리보기 */}
                        {
                            goods.imageUrl?.trim() !== '' && (//trim 공백제거- 값이 있으면 그값,없으면 넘어가게
                                <img
                                    src={goods.imageUrl}
                                    alt={goods.title}
                                    className={styles.preview}
                                />
                            )
                        }
                        <h2>{goods.title}</h2>
                        <p>{goods.description}</p>
                        {/* 비밀번호 확인 전 */}
                        {
                            !pwMatched ? ( //pw가 true일 경우 
                                <div style={{ marginTop: '20px' }}>
                                    <form onSubmit={handleCheckPassword}>
                                        <input type="password"
                                            placeholder="비밀번호 입력"
                                            value={inputPw}
                                            onChange={(e) => setInputPw(e.target.value)}
                                            className={styles.input}
                                            autoComplete="off"
                                        />
                                        <button className={styles.button} type="submit">비밀번호 확인</button>
                                    </form>
                                </div>
                            )
                                :
                                (
                                    /* 확인 후 수정 및 삭제버튼 노출 */
                                    <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
                                        <button type="button" onClick={() => navigate(`/edit/${goods.id}`)}
                                            className={styles.button}>
                                            수정
                                        </button>
                                        <button type="button" onClick={handleDelete}
                                            className={styles.button} style={{ backgroundColor: '#ff4d4f' }}>
                                            삭제
                                        </button>
                                    </div>
                                )
                        }
                    </div>)
                    : (<p style={{ padding: '40px 0', textAlign: 'center' }}>굿즈를 찾을 수 없습니다</p>)
            }
        </Layout>
    )
}
export default Detail;