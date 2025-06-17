

import { useState } from "react";
import Header from "../components/header/Header";
import Layout from "../components/Layout";
import reviewstyles from "./WriteReview.module.css"
import { uploadToCloudinary } from "../utils/cloudinary";
import styles from "./form.module.css"



const WriteReview = () => {
    const [imageUrls, setImageUrls] = useState<string[]>([]);

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
                            {imageUrls.length}/
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
        </Layout>
    )
}
export default WriteReview;