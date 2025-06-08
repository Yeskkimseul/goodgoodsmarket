import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from './MainMoreBtn.module.css';
import Layout from "./Layout";

interface MainMoreBtnProps {
    children?: React.ReactNode; //추가적인 children props를 받을 수 있도록 설정
    popupContent?: React.ReactNode | ((props: { close: () => void }) => React.ReactNode); //팝업 내용으로 함수도 받을 수 있도록 설정
    //팝업 내용이 함수일 경우, close 함수를 인자로 받도록 설정
    //이렇게 하면 팝업 내용에서 close 함수를 호출하여 팝업을 닫을 수 있음
}

const MainMoreBtn: React.FC<MainMoreBtnProps> = ({ children, popupContent }) => {
    const [open, setOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const navigate = useNavigate();

    // 팝업 열기
    const handleOpen = () => {
        setVisible(true);
        setTimeout(() => setOpen(true), 10); // 트랜지션 적용을 위해 약간의 딜레이
    };

    // 팝업 닫기
    const handleClose = () => {
        setOpen(false);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setVisible(false), 300); // 트랜지션 시간과 맞춤
    };

    //기본 팝업 버튼(굿즈 등록/내 거래글 보기/닫기)
    const defaultPopup = (
        <>
            <button className={styles.writeBtn}
                onClick={() => {
                    navigate("/home/goodsupload");
                    setOpen(false);
                }}
            >
                 <img
                    src="../../../images/icon/edit_medium.svg"
                    alt="굿즈등록"
                />
                굿즈 등록
            </button>
            <button
                className={styles.viewBtn}
                onClick={() => {
                    navigate("/mypage/mydeals");
                    setOpen(false);
                }}
            >
                 <img
                    src="../../../images/icon/book_medium.svg"
                    alt="내거래글보기"
                />
                내 거래글 보기
            </button>
            <button
                className={`button ${styles.closeBtn}`}
                onClick={() => setOpen(false)}
                aria-label="닫기" //영역 접근성을 위한 aria-label 추가
            >
                    <img
                    src="../../../images/icon/x_medium.svg"
                    alt="닫기"
                />
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
                    onClick={() => (open ? handleClose() : handleOpen())}
                    aria-label="더보기"
                >
                    <img src="../../../images/icon/plus.svg"
                        alt="더보기"
                        className={styles.plusIcon}
                    />
                </button>
                {visible && (
                    <div className={`${styles.popup} ${open ? styles.popupOpen : ""}`}>
                        {renderPopup()}
                    </div>
                )}
                {children}
            </div>
    );
};

export default MainMoreBtn;