import React from "react";
import { SheetItem } from "./types"; // SheetItem 타입 가져오기
import styles from "./BottomSheetList.module.css"; // CSS 모듈 스타일

interface BottomSheetListProps {
  items: SheetItem[];           // 리스트 항목들
  onItemClick?: () => void;     // 아이템 클릭 후 바텀시트 닫기 등 추가 행동
}

const BottomSheetList = ({ items, onItemClick }: BottomSheetListProps) => {
  return (
    <ul className={styles.list}>
      {items.map((item, index) => (
        <li
          key={index}
          className={styles.item}
          onClick={() => {
            item.onClick();
            onItemClick?.();
          }}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default BottomSheetList;