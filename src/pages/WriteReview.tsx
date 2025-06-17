
import React from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import Layout from "../components/Layout";
import reviewstyles from "./WriteReview.module.css"
import { uploadToCloudinary } from "../utils/cloudinary";
import styles from "./form.module.css"
import ToggleButton from "../components/ToggleButton";
import { useNavigate, useLocation } from "react-router-dom";
import ReviewTop from "../components/ReviewTop";


const WriteReview: React.FC = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
    const isSelected = (text: string) => selectedKeywords.includes(text);
    const [searchValue, setSearchValue] = useState("");
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const location = useLocation();
    const { image, title, date } = location.state || {};

    const reviewOptions = {
        review1: {
            image: "/images/review/review3.png",
            title: "아이언맨 저금통",
            date: "2025.09.02",
        },
        review2: {
            image: "../images/transactional/1-1.png",
            title: "수국공주수수 피규어",
            date: "2025.05.17",
        },
        review3: {
            image: "../images/transactional/1-2.png",
            title: "요술탐정 쥬로링 거울키링",
            date: "2025.05.04",
        },
        review4: {
            image: "../images/transactional/1-3.jpg",
            title: "한정 복각미미",
            date: "2025.04.29",
        },
        review5: {
            image: "../images/transactional/1-4.png",
            title: "이세계 전학 굿즈 세트",
            date: "2025.04.02",
        },
        review6: {
            image: "../images/transactional/1-5.png",
            title: "마법쓰는 사무직 굿즈",
            date: "2025.01.29",
        },
    };

    const review1 = reviewOptions.review1;

    <ReviewTop
        image={image || review1.image}
        title={title || review1.title}
        date={date || review1.date}
    />

    // title이 일치하는 review key 찾기
    const matchedKey = Object.keys(reviewOptions).find(
        key => reviewOptions[key as keyof typeof reviewOptions].title === title
    ) as keyof typeof reviewOptions | undefined;

    const [selectedReview, setSelectedReview] = useState<
        'review1' | 'review2' | 'review3' | 'review4' | 'review5' | 'review6'
    >(matchedKey ?? 'review1');

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const selectedFiles = Array.from(files);
        const currentCount = imageUrls.length;
        const totalCount = currentCount + selectedFiles.length;

        if (totalCount > 10) {
            alert('이미지는 최대 10장까지만 업로드할 수 있어요.');
            return;
        }

        const uploadPromises = selectedFiles.map(file => uploadToCloudinary(file));

        try {
            const urls = await Promise.all(uploadPromises);
            setImageUrls(prev => [...prev, ...urls]);
        } catch (err) {
            alert('하나 이상의 이미지 업로드에 실패했어요.');
        }


    };



    const handleToggle = (text: string, _selected: boolean) => {
        setSelectedKeywords(prev => {
            return prev.includes(text)
                ? prev.filter(keyword => keyword !== text) // 선택 해제
                : [...prev, text];                         // 선택 추가
        });
    };

    const maxLength = 100;
    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // ...등록 처리 로직...
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <Layout>
            <Header type="type1" title="후기 작성하기" />
            {/*             <div className={reviewstyles.reviewInfo}>
                <img className={reviewstyles.reviewImg} src="
            /images/review/review3.png" alt="리뷰이미지" />
                <div className={reviewstyles.reviewInfoTxt}>
                    <h4 className={reviewstyles.reviewInfoTitle}>
                        아이언맨 저금통
                    </h4>
                    <p className={`caption ${reviewstyles.reviewInfoTime}`}>
                        2025.05.29
                    </p>
                </div>
            </div> */}
            <ReviewTop
                image={image || review1.image}
                title={title || review1.title}
                date={date || review1.date}
            />

            <div className={reviewstyles.line}></div>
            <div className={reviewstyles.reviewUpload}>
                <h3>사진 첨부하기</h3>
                <div className={styles.imgflex}>
                    <label className={styles.imguploadlabel}>
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} className={styles.imgupload} />
                        <div className={styles.counter}>
                            {imageUrls.length}/10
                        </div>
                    </label>
                    {imageUrls.map((url, index) => (
                        <div key={index} className={styles.previewWrapper}>
                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={() =>
                                    setImageUrls((prev) => prev.filter((_, i) => i !== index))
                                }
                            >
                                &times;
                            </button>
                            <img src={url} alt={`업로드 미리보기 ${index + 1}`} className={styles.previewImage} />
                        </div>
                    ))}
                </div>
            </div>
            <div className={reviewstyles.reviewTag}>
                <h3>키워드 선택</h3>
                <div className={reviewstyles.reviewTagList}>
                    <div className={reviewstyles.reviewtagListTop}>
                        <ToggleButton text="제가 있는 곳 까지 오셨어요." onSelect={handleToggle} selected={isSelected("제가 있는 곳 까지 오셨어요.")} />
                        <ToggleButton text="답장이 빨라요" onSelect={handleToggle} selected={isSelected("답장이 빨라요")} />
                    </div>
                    <div className={reviewstyles.reviewTagListBottom}>
                        <ToggleButton text="친절해요" onSelect={handleToggle} selected={isSelected("친절해요")} />
                        <ToggleButton text="퀄리티가 좋아요" onSelect={handleToggle} selected={isSelected("퀄리티가 좋아요")} />
                        <ToggleButton text="실물이 예뻐요" onSelect={handleToggle} selected={isSelected("실물이 예뻐요")} />
                    </div>
                </div>
            </div>
            <div className={reviewstyles.reveiwWrite}>
                <h3>리뷰 쓰기</h3>
                <form onSubmit={handleSubmit}>
                    <label className={styles.goodstxt}>
                        <textarea
                            value={description}
                            onChange={handleChange}
                            maxLength={maxLength}
                            placeholder="박스 상태도 좋고 마음에 듭니다!
                                "
                        />
                        <div className={`caption ${reviewstyles.inputLength}`}>
                            {description.length} / {maxLength}
                        </div>
                    </label>
                    <div className={reviewstyles.reviewDescription}>
                        <p className={`body ${reviewstyles.reviewDescriptionTitle}`}>리뷰 유의사항</p>
                        <p className={`caption ${reviewstyles.reviewDescriptionBody}`}>
                            리뷰는 굿굿마켓 이용자에게 공개되며, 홍보용으로 활용될 수
                            있습니다. 리뷰 등록은 마케팅 등록 활용에 동의한 것으로 간주합니다.
                        </p>
                    </div>
                    <div className={reviewstyles.submitWrap}>
                        <button
                            className={reviewstyles.upload} type="submit"
                        >후기 작성 완료</button>
                    </div>
                </form>
            </div>
        </Layout>
    )

};

export default WriteReview;