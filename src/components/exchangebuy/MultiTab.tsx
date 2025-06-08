import React, { useState, ReactNode } from 'react';
import styles from './Tab.module.css';

interface MultiTabProps {
    tabs: string[];
    children: (activeIndex: number) => ReactNode;
}

const MultiTab: React.FC<MultiTabProps> = ({ tabs, children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className={styles.MultiTab}>
            <div className={styles.tab}>
                {tabs.map((tab, idx) => (
                    <div
                        key={tab}
                        className={`${styles.tabbtn} ${activeIndex === idx ? styles.active : ''}`}
                        onClick={() => setActiveIndex(idx)}
                    >
                        {tab}
                    </div>
                ))}
            </div>
            <div className={styles.tabContent}>
                {children(activeIndex)}
            </div>
        </div>
    );
};
/* 사용 예시
 <MultiTab tabs={['교환', '구매', '나눔']}>
    {(activeIndex) => {
      if (activeIndex === 0) return <div>교환 탭 내용</div>;
      if (activeIndex === 1) return <div>구매 탭 내용</div>;
      if (activeIndex === 2) return <div>나눔 탭 내용</div>;
      return null;
    }}
  </MultiTab>
  tab에서 한 번 더 부르지 않고 배열에 원하는 만큼 탭 이름 넣기 가능
*/
export default MultiTab;