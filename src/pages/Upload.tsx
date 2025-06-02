import Layout from "../components/Layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Goods } from "../types";
import styles from "./form.module.css"
import { useGoods } from "../context/GoodsContext";
import { uploadToCloudinary } from "../utils/cloudinary";

const Upload = () => {
    const navigate = useNavigate();
    const { setGoodsList } = useGoods(); //굿즈 목록 업데이트
    //각 입력 필드의 상태 만들기
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [password, setPassword] = useState('');

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

    //등록 또는 엔터로 제출시 실행
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); //새로고침 방지

        const newGoods: Goods = {
            id: Date.now().toString(), //고유 id
            title,
            description,
            imageUrl,
            likes: 0,
            password,
        }
        let stored = localStorage.getItem('goodsList');
        let existing: Goods[] = [];

        if (stored) {
            existing = JSON.parse(stored);
        } else {
            const response = await fetch('/data/goods.json');
            const dummy = await response.json();
            existing = dummy;
        }//저장된 데이터가 없을 때에는 더미데이터를 보여줌

        const updated = [newGoods, ...existing];
        localStorage.setItem('goodsList', JSON.stringify(updated));
        setGoodsList(updated);
        navigate('/');
    }

    return (
        <Layout>{/* 자동완성 끄기 */}
            <form onSubmit={handleSubmit} className={styles.form} autoComplete="off">
                <h2>굿즈업로드</h2>
                <input
                    type="text" placeholder="제목을 입력하세요"
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
                    placeholder="수정/삭제용 비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={styles.input}
                />
                <button type="submit" className={styles.button}>굿즈 등록하기</button>
            </form>
        </Layout>
    )
}
export default Upload;