import Layout from "../components/Layout";
import React, { useRef, useState, useEffect } from "react";
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
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 이미지/동영상 업로드 핸들러
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

  const handleSubmit = async (e?: React.FormEvent) => {
  if (e) e.preventDefault();

  // 🔥 [1] 태그 추출
  const tagArr = Array.from(
    new Set(
      description
        .split(/[\s\n]+/)
        .filter(word => word.startsWith('#') && word.length > 1)
        .map(word => word.replace(/[^#\w가-힣]/g, ''))
    )
  );
  setTags(tagArr); // 상태도 갱신

  // 🔥 [2] 본문에서 태그 제거
  const cleanedDescription = description
    .split(/[\s\n]+/)
    .filter(word => !(word.startsWith('#') && word.length > 1))
    .join(' ');

  // 🔥 [3] newCommu에 정제된 본문과 태그 사용
  const newCommu: Commu = {
    id: Date.now().toString(),
    title,
    description: cleanedDescription,
    category,
    imageUrl: imageUrls.length > 0 ? imageUrls[0] : '',
    likes: 0,
    createdAt: new Date().toISOString(),
    views: 0,
    tags: tagArr,
    userimgUrl: '/images/users/profile.png',
    userName: '뱃지가좋아',
    commentsNum: 0,
    comments: []
  };

  // 필수 입력값 검증
  if (!title.trim()) {
    alert("제목을 입력해주세요.");
    return;
  }
  if (!cleanedDescription.trim()) {
    alert("내용을 입력해주세요.");
    return;
  }

  // tags를 commuTags에 저장
  const commuTags = JSON.parse(localStorage.getItem('commuTags') || '{}');
  commuTags[newCommu.id] = tagArr;
  localStorage.setItem('commuTags', JSON.stringify(commuTags));

  // commuList 저장
  let stored = localStorage.getItem('commuList');
  let commuList: Commu[] = stored ? JSON.parse(stored) : [];

  // commuList가 비어 있으면 commu.json에서 불러와 병합
  if (commuList.length === 0) {
    const response = await fetch('/data/commu.json');
    const jsonData = await response.json();
    commuList = jsonData;
  }

  const updated = [newCommu, ...commuList];
  localStorage.setItem('commuList', JSON.stringify(updated));
  setCommuList(updated);

  console.log('게시글 등록 완료:', newCommu);
  navigate('/community');
};

  return (
    <>

      <Layout>
        <Header
          type="type3"
          onComplete={() => formRef.current?.requestSubmit()}
        />

        <form className={styles.form} onSubmit={handleSubmit} ref={formRef}>

          {/* 기존 select 태그 대신 아래 커스텀 드롭다운 */}
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
                        setTimeout(() => setShowCategoryDropdown(false), 0); // 비동기적으로 닫힘 처리
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
              onChange={e => setDescription(e.target.value)}
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
            게시글 등록
          </button>
        </form>

      </Layout>

    </>
  );
};

export default CommuUpload;