import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from './MainMoreBtn.module.css';

interface MainMoreBtnProps {
    children?: React.ReactNode; //추가적인 children props를 받을 수 있도록 설정
    popupContent?: React.ReactNode | ((props: {close : () => void }) => React.ReactNode); //팝업 내용으로 함수도 받을 수 있도록 설정
    //팝업 내용이 함수일 경우, close 함수를 인자로 받도록 설정
    //이렇게 하면 팝업 내용에서 close 함수를 호출하여 팝업을 닫을 수 있음
}

const MainMoreBtn: React.FC<MainMoreBtnProps> = ({ children, popupContent }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    //기본 팝업 버튼(굿즈 등록/내 거래글 보기/닫기)
    const defaultPopup = (
        <>
            <button className={styles.actionBtn}
                onClick={() => {
                    navigate("/home/goodsupload");
                    setOpen(false);
                }}
            >
                굿즈 등록
            </button>
            <button
                className={styles.actionBtn}
                onClick={() => {
                    navigate("/mypage/mydeals");
                    setOpen(false);
                }}
            >
                내 상품 관리
            </button>
            <button
                className={styles.closeBtn}
                onClick={() => setOpen(false)}
                aria-label="닫기" //영역 접근성을 위한 aria-label 추가
            >
                닫기
            </button>
        </>
    );

 // popupContent가 함수면 close 함수 전달, 아니면 그대로 렌더링
    const renderPopup = () => {
        if (typeof popupContent === "function") {
            return popupContent({ close: () => setOpen(false) });
        }
        return popupContent || defaultPopup;
    };

    return (
        <div className={styles.mainMoreBtnWrap}>
            <button
                className={styles.pluseBtn}
                onClick={() => setOpen((prev) => !prev)}
                aria-label="더보기"
            >
                +
            </button>
            {open && (
                <div className={styles.popup}>
                    {renderPopup()}
                </div>
            )}
            {children}
        </div>

    );
};

export default MainMoreBtn;