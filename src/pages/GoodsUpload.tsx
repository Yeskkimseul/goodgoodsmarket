import Layout from "../components/Layout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Goods } from "../types";
import styles from "./form.module.css"
import { useGoods } from "../context/GoodsContext";
import { uploadToCloudinary } from "../utils/cloudinary";

const conditionOptions = ["새 상품", "중고"];
const itemOptions = ["없음", "일부 포함", "전체 포함"];
const deliveryOptions = ["직거래", "택배 거래"];

const GoodsUpload = () => {
    const navigate = useNavigate();
    const { setGoodsList } = useGoods();

    const categoryList = [
        "포토카드", "인형", "아크릴 굿즈", "문구류", "패션", "음반", "팬 라이트", "잡지", "티켓", "팬 메이드", "기타"
    ];

    const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
    const [selectedItem, setSelectedItem] = useState<string[]>([]);
    const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]);
    const [directPlace, setDirectPlace] = useState("");
    const [options, setOptions] = useState<string[]>([]);
    const [showOptionPopup, setShowOptionPopup] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState(categoryList[0]);
    const [price, setPrice] = useState(0);

    const handleCheck = (
        option: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        setSelected(
            selected.includes(option)
                ? selected.filter((o) => o !== option)
                : [...selected, option]
        );
    };

    // 옵션 팝업 완료
    const handleOptionComplete = () => {
        let allOptions = [...selectedCondition, ...selectedItem, ...selectedDelivery];
        if (selectedDelivery.includes('직거래') && directPlace) {
            allOptions = allOptions.map(opt => opt === '직거래' ? `직거래 (${directPlace})` : opt);
        }
        setOptions(allOptions);
        setShowOptionPopup(false);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const uploadUrl = await uploadToCloudinary(file);
            setImageUrl(uploadUrl);
        } catch (err) {
            alert('업로드 실패');
        }
    };

    // 등록 또는 엔터로 제출시 실행
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newGoods: Goods = {
            id: Date.now().toString(),
            title,
            description,
            category,
            price,
            imageUrl,
            likes: 0,
            createdAt: new Date().toISOString(),
            views: 0,
            options,
            sellerimgUrl: '',
            sellerName: '',
            sellerTrust: 0,
        } as Goods;
        // 로컬스토리지에 저장

        let stored = localStorage.getItem('goodsList');
        let existing: Goods[] = [];

        if (stored) {
            existing = JSON.parse(stored);
        } else {
            const response = await fetch('/data/goods.json');
            const dummy = await response.json();
            existing = dummy;
        }
        const updated = [newGoods, ...existing];
        localStorage.setItem('goodsList', JSON.stringify(updated));
        setGoodsList(updated); // 컨텍스트 업데이트
        navigate('/'); // 홈으로 이동
    };
    
    // setGoodsList((prev) => [...prev, newGoods]);
    // localStorage.setItem('goodsList', JSON.stringify([...JSON.parse(localStorage.getItem('goodsList') || '[]'), newGoods]));
    // navigate('/');
    return (
        <Layout>
            <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>
                        이미지 업로드
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </label>
                    {imageUrl && <img src={imageUrl} alt="업로드 미리보기" className={styles.previewImage} />}
                    <label>
                        제목
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="굿즈 제목을 입력하세요"
                        />
                    </label>
                    <label>
                        카테고리
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            {categoryList.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        가격
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="가격을 입력하세요"
                        />
                    </label>
                    <label>
                        거래 옵션
                        <button type="button" onClick={() => setShowOptionPopup(true)}>
                            옵션 추가
                        </button>
                        <div>
                            {options.map(opt => (<span key={opt} style={{ marginRight: 8 }}>{opt}</span>))}
                        </div>
                        {/* 옵션팝업 */}
                        {showOptionPopup && (
                            <div className={styles.popup}>
                                <h4>상품 상태</h4>
                                {conditionOptions.map(opt => (
                                    <label key={opt} style={{ display: "block" }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedCondition.includes(opt)}
                                            onChange={() => handleCheck(opt, selectedCondition, setSelectedCondition)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                                <h4>구성품</h4>
                                {itemOptions.map(opt => (
                                    <label key={opt} style={{ display: "block" }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedItem.includes(opt)}
                                            onChange={() => handleCheck(opt, selectedItem, setSelectedItem)}
                                        />
                                        {opt}
                                    </label>
                                ))}
                                <h4>거래 방식</h4>
                                {deliveryOptions.map(opt => (
                                    <label key={opt} style={{ display: "block" }}>
                                        <input
                                            type="checkbox"
                                            checked={selectedDelivery.includes(opt)}
                                            onChange={() => handleCheck(opt, selectedDelivery, setSelectedDelivery)}
                                        />
                                        {opt}
                                        {opt === "직거래" && selectedDelivery.includes("직거래") && (
                                            <input
                                                type="text"
                                                placeholder="거래 장소 입력"
                                                value={directPlace}
                                                onChange={e => setDirectPlace(e.target.value)}
                                                style={{ marginLeft: 8 }}
                                            />
                                        )}
                                    </label>
                                ))}
                                <button type="button" onClick={handleOptionComplete}>
                                    입력 완료
                                </button>
                            </div>
                        )}
                    </label>
                    <div>
                        <label>
                            설명
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="굿즈 설명을 입력하세요" />
                        </label>
                    </div>
                    <button type="submit">등록</button>
                </form>
            </div>
        </Layout>
    );
};



export default GoodsUpload;