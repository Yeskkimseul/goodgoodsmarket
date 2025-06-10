import Layout from "../components/Layout";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Goods } from "../types";
import styles from "./form.module.css"
import { useGoods } from "../context/GoodsContext";
import { uploadToCloudinary } from "../utils/cloudinary";
import Header from "../components/header/Header";

const conditionOptions = ["새 상품", "중고"];
const itemOptions = ["없음", "일부 포함", "전체 포함"];
const deliveryOptions = ["직거래", "택배 거래"];

const GoodsUpload = () => {
    const navigate = useNavigate();
    const { setGoodsList } = useGoods();
    const popupRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
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
    const [price, setPrice] = useState<number | string>(0);
    const [optionLabel, setOptionLabel] = useState("옵션 추가");
    const [isNegotiable, setIsNegotiable] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [isPriceOverLimit, setIsPriceOverLimit] = useState(false);
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

    const formatPrice = (value: string | number) => {
        const numeric = typeof value === 'number' ? value.toString() : value.replace(/[^0-9]/g, '');
        return numeric.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {

            if (
                showOptionPopup &&
                popupRef.current &&
                !popupRef.current.contains(event.target as Node)
            ) {
                setShowOptionPopup(false);
                setShowCategoryDropdown(false);

            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptionPopup, showCategoryDropdown]);


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
  const files = e.target.files;
  if (!files) return;

  const selectedFiles = Array.from(files);
  const currentCount = imageUrls.length;
  const totalCount = currentCount + selectedFiles.length;

  if (totalCount > 5) {
    alert('이미지는 최대 5장까지만 업로드할 수 있어요.');
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

    // 등록 또는 엔터로 제출시 실행
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newGoods: Goods = {
            id: Date.now().toString(),
            title,
            description,
            category,
            price,
            /* imageUrl, */
            imageUrl: imageUrls, // 여러 장 저장 (배열)
            likes: 0,
            createdAt: new Date().toISOString(),
            views: 0,
            options,
            sellerimgUrl: '/images/seller1.png',
            sellerName: '뱃지가좋아',
            sellerTrust: 70,
             isExchangeable: false,
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
        navigate('/home'); // 홈으로 이동
    };

    // setGoodsList((prev) => [...prev, newGoods]);
    // localStorage.setItem('goodsList', JSON.stringify([...JSON.parse(localStorage.getItem('goodsList') || '[]'), newGoods]));
    // navigate('/');
    return (
        <Layout>
            <Header type="type1" />
            <div>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.imguploadlabel}>
                       
                        <input type="file" accept="image/*" onChange={handleImageChange} className={styles.imgupload}/>
                    </label>
                    {imageUrl && <img src={imageUrl} alt="업로드 미리보기" className={styles.previewImage} />}
                    <label>
                        상품명
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="상품명을 입력해주세요."
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
                        판매가
                        <input
                            type="checkbox"
                            checked={isNegotiable}
                            onChange={(e) => setIsNegotiable(e.target.checked)}
                        />
                        교환 거래 상품
                    </label>
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
                                            type="radio"
                                            name="condition"
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
                                            type="radio"
                                            name="condition2"
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
                                            type="radio"
                                            name="condition3"
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
                        <label className={styles.goodstxt}>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="-상품 상세 정보를 입력해주세요.
                                -상품명(브랜드), 구매 시기 (년, 월, 일), 사용 기간, 하자 여부
                                *실제 촬영한 사진과 함께 상세 정보를 입력해주세요.
                                *카카오톡 아이디 첨부 시 게시물 삭제 및 이용재재 처리가 될 수 있어요.
                                안전하고 건전한 거래환경을 위해 과학기술정보통신부, 한국인터넷진흥원, 굿굿마켓이 함께합니다.
                                " />
                        </label>
                    </div>
                    <button className={styles.upload} type="submit">등록완료</button>
                </form>
            </div>
        </Layout>
    );
};



export default GoodsUpload;