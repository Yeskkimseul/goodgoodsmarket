import React, { useState, ReactNode } from 'react';
import styles from './Tab.module.css';

interface MultiTabProps {
  tabs: string[];
  activeIndex?: number;
  setActiveIndex?: (idx: number) => void;
  children: (activeIndex: number) => ReactNode;
}

const MultiTab: React.FC<MultiTabProps> = ({ tabs, activeIndex, setActiveIndex, children }) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = activeIndex !== undefined && setActiveIndex !== undefined;
  const currentIndex = isControlled ? activeIndex : internalIndex;

  const handleTabClick = (idx: number) => {
    if (isControlled) setActiveIndex!(idx);
    else setInternalIndex(idx);
  };

  return (
    <div className={styles.MultiTab}>
      <div className={styles.tab}>
        {tabs.map((tab, idx) => (
          <div
            key={tab}
            className={`${styles.tabbtn} ${currentIndex === idx ? styles.active : ''}`}
            onClick={() => handleTabClick(idx)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div className={styles.tabContent}>
        {children(currentIndex)}
      </div>
    </div>
  );
};
/* 사용 예시
 <MultiTab tabs={['구매', '교환']}>
  {(activeIndex) => (
    activeIndex === 0 ? (
      <div>구매 탭 내용</div>
    ) : activeIndex === 1 ? (
      <div>교환 탭 내용</div>
    ) : null
  )}
</MultiTab>
  tab에서 한 번 더 부르지 않고 배열에 원하는 만큼 탭 이름 넣기 가능

  원하는 페이지에서 

  <MultiTab
    tabs={['굿즈 정보', '판매자 정보']}
    activeIndex={activeIndex}
    setActiveIndex={setActiveIndex}
>
    {(activeIndex) => ( ... )}
</MultiTab>
로 제어 가능
*/
export default MultiTab;