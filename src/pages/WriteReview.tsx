
import React from "react";
import { useState } from "react";
import Header from "../components/header/Header";
import Layout from "../components/Layout";
import reviewstyles from "./WriteReview.module.css"
import { uploadToCloudinary } from "../utils/cloudinary";
import styles from "./form.module.css"
import ToggleButton from "../components/ToggleButton";
import { reverse } from "dns";



const WriteReview: React.FC = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const [selectedKeyword, setSelectedKeyword] = useState("");
    const isSelected = (text: string) => selectedKeyword === text;
    const [searchValue, setSearchValue] = useState("");
    const [description, setDescription] = useState('');


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



    const handleToggle = (text: string, selected: boolean) => {
        if (selected) {
            setSearchValue(text);
            setSelectedKeyword(text); // 현재 선택된 키워드 기억
        } else {
            setSearchValue(""); // 해제 시 input 비움
            setSelectedKeyword(""); // 선택 해제
        }

    }

    const maxLength = 100;


    const [value, setValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.target.value.length <= maxLength) {
            setValue(e.target.value);
        }
    };

    return (
        <Layout>
            <Header type="type1" title="후기 작성하기" />
            <div className={reviewstyles.reviewInfo}>
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
            </div>
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
                <div>
                    <label className={styles.goodstxt}>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={maxLength}
                            placeholder="박스 상태도 좋고 마음에 듭니다!
                                "
                        />
                        <div className={`caption ${reviewstyles.inputLength}`}>
                            {value.length} / {maxLength}
                        </div>
                    </label>
                    <div className={reviewstyles.reviewDescription}>
                        <p className={`body ${reviewstyles.reviewDescriptionTitle}`}>리뷰 유의사항</p>
                        <p className={`caption ${reviewstyles.reviewDescriptionBody}`}>
                            리뷰는 굿굿마켓 이용자에게 공개되며, 홍보용으로 활용될 수
                            있습니다. 리뷰 등록은 마케팅 등록 활용에 동의한 것으로 간주합니다.
                        </p>
                    </div>
                </div>
                <button className={styles.upload} type="submit">등록완료</button>
            </div>
        </Layout>
    )

};

export default WriteReview;