import Layout from "../components/Layout";
import React, { useState } from "react";
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
    let finalDelivery = selectedDelivery;
    if (selectedDelivery === '직거래' && directPlace) {
        finalDelivery = `직거래 (${directPlace})`;
    }

    const allOptions = [selectedCondition, selectedItem, finalDelivery].filter(Boolean);
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
                       
                        <input type="file" accept="image/*" onChange={handleImageChange} className={styles.imgupload}/>
                    </label>
                    {imageUrl && (
  <div className={styles.previewWrapper}>
    <button
      type="button"
      className={styles.closeButton}
      onClick={() => setImageUrl(null)}  // 미리보기 제거
    >
      &times;
    </button>
    <img
      src={imageUrl}
      alt="업로드 미리보기"
      className={styles.previewImage}
    />
  </div>
)}
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
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            {categoryList.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </label>
                    <label className={`${styles.sell} ${styles.all}`}>
                        <p>판매가</p>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="가격을 입력해주세요."
                        />
                    </label>
                    <label className={`${styles.dealoption} ${styles.all}`}>
                        <p>거래 옵션</p>
                        <div className={styles.popuparea}>
                        <button type="button" onClick={() => setShowOptionPopup(true)}>
                            옵션 추가
                        </button>
                        
                            {options.map(opt => (<span key={opt} style={{ marginRight: 8 }}>{opt}</span>))}
                        {/* 옵션팝업 */}
                        {showOptionPopup && (
                            <div className={styles.popup}>
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

<h4>구성품</h4>
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

<h4>거래 방식</h4>
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