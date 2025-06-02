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
 


    return (
        <Layout>
        <div>

        </div>
        </Layout>
    )
}
export default Upload;