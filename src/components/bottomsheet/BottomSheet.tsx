import React from "react";
import styles from "./BottomSheet.module.css";

interface BottomSheetProps {
  isOpen: boolean;              // 바텀시트 열림 여부
  onClose: () => void;          // 닫기 함수
  children: React.ReactNode;    // 내부에 들어갈 리스트 등
}

const BottomSheet = ({ isOpen, onClose, children }: BottomSheetProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default BottomSheet;