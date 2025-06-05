export interface SheetItem {
    icon: React.ReactNode;         // 아이콘 (JSX 요소)
    label: string;                  // 항목 이름 (ex. '후기 작성하기')
  onClick: () => void;            // 클릭 시 동작
}