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

    /*     const [selectedCondition, setSelectedCondition] = useState<string[]>([]);
        const [selectedItem, setSelectedItem] = useState<string[]>([]);
        const [selectedDelivery, setSelectedDelivery] = useState<string[]>([]); */

    const [selectedCondition, setSelectedCondition] = useState<string>(""); // 상품 상태
    const [selectedItem, setSelectedItem] = useState<string>(""); // 구성품
    const [selectedDelivery, setSelectedDelivery] = useState<string>(""); // 거래 방식

    const [directPlace, setDirectPlace] = useState("");
    const [options, setOptions] = useState<string[]>([]);
    const [showOptionPopup, setShowOptionPopup] = useState(false);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    /* const [imageUrl, setImageUrl] = useState(''); */
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageUrls, setImageUrls] = useState<string[]>([]);
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
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showOptionPopup]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                showCategoryDropdown &&
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setShowCategoryDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showCategoryDropdown]);


    // 옵션 팝업 완료
    const handleOptionComplete = () => {
        let finalDelivery = selectedDelivery;
        if (selectedDelivery === '직거래' && directPlace) {
            finalDelivery = `직거래 (${directPlace})`;
        }

        const allOptions = [selectedCondition, selectedItem, finalDelivery].filter(Boolean);
        setOptions(allOptions);
        setTimeout(() => setShowOptionPopup(false), 0); // 이벤트 루프 다음 틱에서 처리
        setOptionLabel(allOptions.join(" · ")); // ← 버튼 텍스트 업데이트
        setShowOptionPopup(false); // 팝업 닫기
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

        /* 필수 입력값 검증 */
        if (imageUrls.length === 0) {
            alert("이미지를 1장 이상 업로드해주세요.");
            return;
        }
        if (!title.trim()) {
            alert("상품명을 입력해주세요.");
            return;
        }
        if (!description.trim()) {
            alert("상품 설명을 입력해주세요.");
            return;
        }



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
            sellerimgUrl: '/images/users/profile.png',
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
                    <div className={styles.imgflex}>
                        <label className={styles.imguploadlabel}>
                            <input type="file" accept="image/*" multiple onChange={handleImageChange} className={styles.imgupload} />
                            <div className={styles.counter}>
                                {imageUrls.length}/5
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

                    <label className={`${styles.productname} ${styles.all}`}>
                        <p>상품명</p>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="상품명을 입력해주세요."
                        />
                    </label>
                    <label className={`${styles.categoryname} ${styles.all}`}>
                        <p>카테고리</p>
                        <div className={styles.customDropdown} ref={dropdownRef} >
                            <button
                                type="button"
                                className={styles.dropdownToggle}
                                onClick={() => setShowCategoryDropdown((prev) => !prev)}
                            >
                                {category}
                                <div className={styles.arrowIcon} />
                            </button>
                            {showCategoryDropdown && (
                                <ul className={styles.dropdownMenu} >
                                    {categoryList.map((cat) => (
                                        <li
                                            key={cat}
                                            onClick={() => {
                                                setCategory(cat);
                                                setShowCategoryDropdown(false);
                                                setTimeout(() => setShowCategoryDropdown(false), 0); // 비동기적으로 닫힘 처리
                                            }}
                                            className={`${styles.dropdownItem} ${category === cat ? styles.selected : ""}`}
                                        >
                                            {cat}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </label>
                    <label className={`${styles.sell} ${styles.all}`}>
                        <p>판매가</p>
                        <div className={styles.pricelimit}>
                            <input
                                type="text"
                                inputMode="numeric"
                                style={{
                                    fontFamily: isNegotiable ? "Pretendard Variable" : "기본폰트",
                                }}
                                value={
                                    isNegotiable ? "교환 거래 희망" : formatPrice(price)
                                }
                                onChange={(e) => {
                                    if (isNegotiable) return; // 교환 거래일 땐 입력 막기

                                    const rawValue = e.target.value.replace(/[^0-9]/g, '');
                                    const numericValue = rawValue === '' ? 0 : Number(rawValue);

                                    if (numericValue > 100000000) {
                                        setIsPriceOverLimit(true);
                                    } else {
                                        setIsPriceOverLimit(false);
                                        setPrice(numericValue);
                                    }
                                }}
                                placeholder="가격을 입력해주세요.(숫자만 입력 가능)"
                                readOnly={isNegotiable}
                            />
                            {isPriceOverLimit && (
                                <small className={styles.warningText}>최대 1억원까지 입력 가능합니다.</small>
                            )}
                        </div>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={isNegotiable}
                                onChange={(e) => setIsNegotiable(e.target.checked)}
                                className={styles.checkboxInput}

                            />
                            <span className={styles.customCheckbox}></span>
                            교환 거래 상품
                        </label>

                    </label>
                    <label className={`${styles.dealoption} ${styles.all}`}>
                        <p>거래 옵션</p>
                        <div className={styles.popuparea}>
                            <button
                                type="button"
                                onClick={() => setShowOptionPopup(prev => !prev)}
                                className={styles.optionButton}
                            >
                                {optionLabel}
                            </button>

                            {/* {options.map(opt => (<span key={opt} style={{ marginRight: 8 }}>{opt}</span>))} */}
                            {/* 옵션팝업 */}
                            {showOptionPopup && (
                                <div className={styles.popup} ref={popupRef}>
                                    <h4>상품 상태</h4>
                                    {conditionOptions.map(opt => (
                                        <label key={opt} style={{ display: "block" }}>
                                            <input
                                                type="radio"
                                                name="condition"
                                                checked={selectedCondition === opt}
                                                onChange={() => setSelectedCondition(opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}

                                    <h4 className={styles.txtmgt}>구성품</h4>
                                    {itemOptions.map(opt => (
                                        <label key={opt} style={{ display: "block" }}>
                                            <input
                                                type="radio"
                                                name="item"
                                                checked={selectedItem === opt}
                                                onChange={() => setSelectedItem(opt)}
                                            />
                                            {opt}
                                        </label>
                                    ))}

                                    <h4 className={styles.txtmgt}>거래 방식</h4>
                                    {deliveryOptions.map(opt => (
                                        <label key={opt} style={{ display: "block" }}>
                                            <input
                                                type="radio"
                                                name="delivery"
                                                checked={selectedDelivery === opt}
                                                onChange={() => setSelectedDelivery(opt)}
                                            />
                                            {opt}
                                            {opt === "직거래" && selectedDelivery === "직거래" && (
                                                <input
                                                    type="text"
                                                    placeholder="거래 장소 입력"
                                                    value={directPlace}
                                                    onChange={(e) => setDirectPlace(e.target.value)}
                                                    className={styles.directPlaceInput}
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
                        </div>
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
                                "
                            />
                        </label>
                    </div>
                    <button className={styles.upload} type="submit">등록완료</button>
                </form>
            </div>
        </Layout>
    );
};



export default GoodsUpload;