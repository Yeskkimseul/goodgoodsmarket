import React, { useState } from 'react';
import styles from './Tab.module.css';

const DefaultTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'exchange' | 'buy'>('exchange');

  return (
    <div>
      <div className={styles.tab}>
        <div
          className={`${styles.tableft} ${activeTab === 'exchange' ? styles.active : ''}`}
          onClick={() => setActiveTab('exchange')}
        >
          교환
        </div>
        <div
          className={`${styles.tabright} ${activeTab === 'buy' ? styles.active : ''}`}
          onClick={() => setActiveTab('buy')}
        >
          구매
        </div>
      </div>

      <div className={styles.tabContent}>
        {activeTab === 'exchange' ? (
          <div>📦 교환 탭 콘텐츠</div>
        ) : (
          <div>💸 구매 탭 콘텐츠</div>
        )}
      </div>
    </div>
  );
};

export default DefaultTab;
