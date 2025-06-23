import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import HeaderType4 from "../components/header/HeaderType4";
import styles from "../pages/Mypage.module.css"

const ProfileSetting = () => {
    const [name, setName] = useState('뱃지가좋아');
    const [profileImg, setProfileImg] = useState("/images/mypage/profile_photo.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const savedImg = localStorage.getItem("profileImg");
        const savedName = localStorage.getItem("profileName");
        if (savedImg) setProfileImg(savedImg);
        if (savedName) setName(savedName);
    }, []);

    const handleEditClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setProfileImg(ev.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();

    const handleDone = () => {
        localStorage.setItem("profileImg", profileImg);
        localStorage.setItem("profileName", name);
        navigate("/mypage");
    };

    return (
        <Layout>
            <HeaderType4 onComplete={handleDone} />
            <div className={styles.profilesetting_wrapper}>
                <div className={styles.profilesetting}>
                    <img src={profileImg} alt="프로필사진" style={{
                        borderRadius: "130px",
                        width: "clamp(130px, 15vw, 179px)",
                        height: "clamp(130px, 15vw, 179px)",
                        objectFit: "cover"
                    }} />
                    <div className={styles.edit} onClick={handleEditClick} style={{ cursor: 'pointer' }}>
                        <img src="/images/mypage/camera.svg" alt="프로필변경아이콘" />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            ref={fileInputRef}
                            onChange={handleFileChange}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.profilesetting_bottom}>
                <div className={styles.pbw}>
                    <h4>닉네임</h4>
                    <input
                        type='email'
                        className={styles.input}
                        placeholder='닉네임을 입력하세요.'
                        value={name}
                        onChange={e => {
                            setName(e.target.value);
                        }}
                    />
                </div>
            </div>

        </Layout>
    )
}
export default ProfileSetting;