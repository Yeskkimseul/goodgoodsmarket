import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import styles from "../pages/Mypage.module.css"

const ProfileSetting = () => {

    const [name, setName] = useState('뱃지가좋아'); // 기본값 지정

    return (
        <Layout>
            <Header type='type4' />
            <div className={styles.profilesetting_wrapper}>
                <div className={styles.profilesetting}>
                    <img src="/images/mypage/profile_photo.png" alt="프로필사진" />
                    <div className={styles.edit}>
                        <img src="/images/mypage/camera.svg" alt="프로필변경아이콘" />
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