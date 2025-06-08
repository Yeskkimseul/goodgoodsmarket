import Layout from "../components/Layout";
import MultiTab from "../components/exchangebuy/MultiTab";
import Header from "../components/header/Header";
import styles from '../components/exchangebuy/Tab.module.css';

const GoodsCategory = () => {
  return (
    <Layout>
      <Header type="type1"></Header>
      <div className={styles.pageContent}>
        <MultiTab tabs={['구매', '교환']}>
          {(activeIndex) => (
            activeIndex === 0 ? (
              <div>구매 탭 내용</div>
            ) : activeIndex === 1 ? (
              <div>교환 탭 내용</div>
            ) : null
          )}
        </MultiTab>
      </div>
    </Layout>
  )

}

export default GoodsCategory;