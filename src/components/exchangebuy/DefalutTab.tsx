import React, { useState, ReactNode } from 'react';
import styles from './Tab.module.css';


interface DefaultTabProps {
  leftTab: string;
  rightTab: string;
  children: (activeTab: 'left' | 'right') => ReactNode;
}




const DefaultTab: React.FC<DefaultTabProps> = ({ leftTab, rightTab, children }) => {
  const [activeTab, setActiveTab] = useState<'left' | 'right'>('left');

  return (
    <div>
      <div className={styles.tab}>
        <div
          className={`${styles.tableft} ${activeTab === 'left' ? styles.active : ''}`}
          onClick={() => setActiveTab('left')}
        >
          {leftTab}
        </div>
        <div
          className={`${styles.tabright} ${activeTab === 'right' ? styles.active : ''}`}
          onClick={() => setActiveTab('right')}
        >
          {rightTab}
        </div>
      </div>
      <div className={styles.tabContent}>
        {children(activeTab)}
      </div>
    </div>
  );
};

/* 부모에서의 사용법
<DefaultTab leftTab="교환" rightTab="구매">
  {(activeTab) =>
    activeTab === 'left'
      ? <div>교환 탭에 원하는 내용</div>
      : <div>구매 탭에 원하는 내용</div>
  }
</DefaultTab>
*/

export default DefaultTab;
