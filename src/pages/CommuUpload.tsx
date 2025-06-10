import Layout from "../components/Layout";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './CommuUpload.module.css';
import { useCommu } from "../context/CommuContext";
import { Commu } from "../types/commu";
import { uploadToCloudinary } from "../utils/cloudinary";
import Header from "../components/header/Header";


const commuCategories = ["굿즈 자랑", "굿즈 소식", "자유게시판"];

const CommuUpload = () => {
    const navigate = useNavigate();
    const { setCommuList } = useCommu();

    const [category, setCategory] = useState(commuCategories[0]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    /* const [imageUrl, setImageUrl] = useState(''); */
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [tags, setTags] = useState<string[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    // 이미지/동영상 업로드 핸들러
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const uploadUrl = await uploadToCloudinary(file);
            setImageUrl(uploadUrl);
        } catch (error) {
            alert("이미지 업로드에 실패했습니다.");
        }
    };

    // 게시글 등록 핸들러
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const newCommu: Commu = {
            id: Date.now().toString(),
            title,
            description,
            category,
            imageUrl: imageUrl ?? '', // ← null일 경우 빈 문자열로 처리
            likes: 0,
            createdAt: new Date().toISOString(),
            views: 0,
            tags,
            userimgUrl: '/images/seller1.png',
            userName: '뱃지가좋아',
            commentsNum: 70,
            comments: []
        };

        //로컬 스토리지에 저장
        let stored = localStorage.getItem('commuList');
        let commuList: Commu[] = [];
        if (stored) {
            commuList = JSON.parse(stored);
        } else {
            try {
                const response = await fetch('/data/commu.json');
                const dummy = await response.json();
                commuList = dummy;
            } catch {
                commuList = [];
            }
        }

        const updated = [newCommu, ...commuList];
        localStorage.setItem('commuList', JSON.stringify(updated));
        setCommuList(updated); // 컨텍스트 업데이트
        console.log('게시글 등록 완료:', newCommu);
        navigate('/community'); // 커뮤니티 페이지로 이동
    };

    return (
        <>

            <Layout>
                <Header
                type="type3"
                onComplete={() => formRef.current?.requestSubmit()}
                />
                
                <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
                    <label className={styles.categoryselect}>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            {commuCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </label>
                    <label className={styles.title}>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            placeholder="제목을 입력해주세요"
                        />
                    </label>
                    <label className={styles.txtarea}>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            placeholder="굿굿마켓은 건전한 굿즈 문화를 지향합니다. 
                            자유게시판은 소통을 위한 공간이며, 거래 글이나 규칙을 어긴 게시물은 삭제되거나 이용이 제한될 수 있습니다."
                        />
                    </label>

                <div className={styles.photovideo}>
                    <label className={styles.photo}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                            <div
                                 className={styles.uploadareaphoto}  // CSS 파일에서 스타일링할 클래스
                                 onChange={handleImageChange}
                                 >
                            </div>
                        사진
                    </label>
                    <label className={styles.video}>                     
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                        />
                            <div
                                 className={styles.uploadareavideo}  // CSS 파일에서 스타일링할 클래스
                                 onChange={handleImageChange}
                                 >
                            </div>
                        동영상
                    </label>
                    {imageUrl && <img src={imageUrl} alt="업로드 미리보기" className={styles.previewImage} />}
                    <button type="submit" className={styles.submitButton}>
                        게시글 등록
                    </button>
                    </div>
                </form>
                
            </Layout>
            
        </>
    );
};

export default CommuUpload;