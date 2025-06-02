//수정 페이지
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Goods } from "../types";
import styles from "./form.module.css";
import Layout from "../components/Layout";
import { uploadToCloudinary } from "../utils/cloudinary";

const Edit = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    //각 입력 필드의 상태 만들기
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [password, setPassword] = useState(''); //원래 저장되어있던 비번
    const [inputPw, setInputPw] = useState(''); // 사용자가 입력한 비번

    //페이지가 처음 열릴 때 실행되는 부분(굿즈 정보 가져오기)
    useEffect(() => {
        const data = localStorage.getItem('goodsList');
        if (data) {
            const list: Goods[] = JSON.parse(data);
            const found = list.find((g) => g.id === id) //id로 굿즈찾기
            if (found) {
                setTitle(found.title);
                setDescription(found.description);
                setImageUrl(found.imageUrl);
            }
        }
    }, [id]);

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const uploadUrl = await uploadToCloudinary(file);
            setImageUrl(uploadUrl); //미리보기로 사진 보여주기
        } catch (err) {
            alert('업로드 실패');
        }
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault(); //새로고침 방지
        //비밀번호 확인
        if (inputPw !== password) {
            alert('비밀번호가 일치하지 않습니다');
            return;
        }
        const data = localStorage.getItem('goodsList');
        if (data) {
            const list: Goods[] = JSON.parse(data);
            const updatedList = list.map((item) =>
                item.id === id ? { ...item, title, description, imageUrl } : item
            )
            localStorage.setItem('goodsList', JSON.stringify(updatedList));
            navigate('/');
        }
    }


    return (
        <Layout>{/* 자동완성 끄기 */}
            <form onSubmit={handleUpdate} className={styles.form} autoComplete="off">
                <h2>굿즈 수정</h2>
                <input
                    type="text" placeholder="제목"
                    value={title}
                    required
                    className={styles.input}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="이미지 주소(url)"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className={styles.input}
                    autoComplete="current-url"//써도 되고 지워도 됨, 인풋 타입 url로 하는 게 더 적합함
                />
                <textarea
                    placeholder="굿즈 설명"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className={styles.textarea}
                />
                <input type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className={styles.input}
                />
                {imageUrl ? (<img src={imageUrl} alt="굿즈 미리보기" className={styles.preview} />) : null}
                <input type="password"
                    placeholder="등록시 입력한 비밀번호"
                    value={inputPw}
                    onChange={(e) => setInputPw(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>수정하기</button>
            </form>
        </Layout>
    )
}
export default Edit;