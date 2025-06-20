import Layout from "../components/Layout";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from './CommuUpload.module.css';
import { useCommu } from "../context/CommuContext";
import { Commu } from "../types/commu";
import { uploadToCloudinary } from "../utils/cloudinary";
import Header from "../components/header/Header";

const commuCategories = ["굿즈 자랑", "굿즈 소식", "자유게시판"];



const CommuEdit = () => {

    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { setCommuList } = useCommu();

    const [category, setCategory] = useState(commuCategories[0]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [tags, setTags] = useState<string[]>([]);
    const formRef = useRef<HTMLFormElement>(null);

    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!id) return;

        // 1. localStorage에 commuList가 없으면 commu.json에서 불러와 저장
        let stored = localStorage.getItem('commuList');
        if (!stored) {
            fetch('/data/commu.json')
                .then(res => res.json())
                .then((data: Commu[]) => {
                    localStorage.setItem('commuList', JSON.stringify(data));
                    const found = data.find(item => item.id === id);
                    if (found) {
                        setCategory(found.category);
                        setTitle(found.title);
                        setDescription(found.description);
                        setImageUrls(found.imageUrl ? (Array.isArray(found.imageUrl) ? found.imageUrl : [found.imageUrl]) : []);
                        setTags(found.tags || []);
                    }
                });
        } else {
            // 2. localStorage에 commuList가 있으면 거기서 찾기
            const commuList: Commu[] = JSON.parse(stored);
            const found = commuList.find(item => item.id === id);
            if (found) {
                setCategory(found.category);
                setTitle(found.title);
                setDescription(found.description);
                setImageUrls(found.imageUrl ? (Array.isArray(found.imageUrl) ? found.imageUrl : [found.imageUrl]) : []);
                setTags(found.tags || []);
            }
        }
    }, [id]);



    // 카테고리 드롭다운 영역 밖 클릭 시 닫기
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowCategoryDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // 이미지 업로드
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (!files.length) return;
        try {
            const uploadPromises = files.map(file => uploadToCloudinary(file));
            const uploadedUrls = await Promise.all(uploadPromises);
            setImageUrls(prev => [...prev, ...uploadedUrls]);
        } catch (error) {
            alert("이미지 업로드에 실패했습니다.");
        }
    };

    // 게시글 수정 핸들러
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!title.trim()) {
            alert("제목을 입력해주세요.");
            return;
        }
        if (!description.trim()) {
            alert("내용을 입력해주세요.");
            return;
        }
    

        // 기존 commuList 불러오기
        let stored = localStorage.getItem('commuList');
        let commuList: Commu[] = stored ? JSON.parse(stored) : [];

        // 기존 게시글 찾아서 수정
        commuList = commuList.map(item =>
            item.id === id
                ? {
                    ...item,
                    title,
                    description,
                    category,
                    imageUrl: imageUrls[0], // 대표 이미지만 저장
                    tags,
                }
                : item
        );

        localStorage.setItem('commuList', JSON.stringify(commuList));
        setCommuList(commuList); // 컨텍스트 업데이트
        alert('게시글이 수정되었습니다.');
        navigate('/community/mycommu');
    };

    return (
        <Layout>
            <Header
                type="type3"
                onComplete={() => formRef.current?.requestSubmit()}
            />
            <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>
                <label className={styles.categoryselect}>
                    <div className={styles.customDropdown} ref={dropdownRef}>
                        <button
                            type="button"
                            className={styles.dropdownToggle}
                            onClick={() => setShowCategoryDropdown(prev => !prev)}
                            aria-haspopup="listbox"
                            aria-expanded={showCategoryDropdown}
                        >
                            {category}
                            <div className={styles.arrowIcon} />
                        </button>
                        {showCategoryDropdown && (
                            <ul
                                className={styles.dropdownMenu}
                                role="listbox"
                                tabIndex={-1}
                                aria-activedescendant={`option-${category}`}
                            >
                                {commuCategories.map(cat => (
                                    <li
                                        key={cat}
                                        id={`option-${cat}`}
                                        role="option"
                                        aria-selected={category === cat}
                                        className={`${styles.dropdownItem} ${category === cat ? styles.selected : ''}`}
                                        onClick={() => {
                                            setCategory(cat);
                                            setShowCategoryDropdown(false);
                                            setTimeout(() => setShowCategoryDropdown(false), 0);
                                        }}
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </label>
                <label className={styles.title}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력해주세요"
                    />
                </label>
                <label className={styles.txtarea}>
                    <textarea
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);

                            // #키워드 추출 (공백 또는 줄바꿈 기준)
                            const tagArr = Array.from(
                                new Set(
                                    e.target.value
                                        .split(/[\s\n]+/)
                                        .filter(word => word.startsWith('#') && word.length > 1)
                                        .map(word => word.replace(/[^#\w가-힣]/g, '')) // 특수문자 제거
                                )
                            );
                            setTags(tagArr);

                            // 로컬스토리지에 저장 (id별로 tags 저장)
                            if (id) {
                                const storedTags = JSON.parse(localStorage.getItem('commuTags') || '{}');
                                storedTags[id] = tagArr;
                                localStorage.setItem('commuTags', JSON.stringify(storedTags));
                            }
                        }}
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
                            className={styles.uploadareaphoto}
                            onChange={handleImageChange}
                        >
                        </div>
                        사진
                    </label>
                    {/* 동영상 업로드는 필요시 추가 */}
                </div>
                <div className={styles.previewList}>
                    {imageUrls.map((url, index) => (
                        <div key={index} className={styles.previewWrapper}>
                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={() =>
                                    setImageUrls(prev => prev.filter((_, i) => i !== index))
                                }
                            >
                                &times;
                            </button>
                            <img src={url} alt={`업로드 미리보기 ${index + 1}`} className={styles.previewImage} />
                        </div>
                    ))}
                </div>
                <button type="submit" className={styles.submitButton}>
                    게시글 수정
                </button>
            </form>
        </Layout>
    )
}

export default CommuEdit;