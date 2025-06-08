import Layout from "../components/Layout";
import DefaultTab from "../components/exchangebuy/DefalutTab";
import Header from "../components/header/Header";
import styles from '../components/exchangebuy/Tab.module.css';

const GoodsCategory = () => {
  return (
    <Layout>
      <Header type="type1"></Header>
      <div className={styles.pageContent}>
        <DefaultTab leftTab="교환" rightTab="구매">
          {(activeTab) =>
            activeTab === 'left'
              ? <div>교환 탭에 원하는 컴포넌트</div>
              : <div>구매 탭에 원하는 컴포넌트</div>
          }
        </DefaultTab>
      </div>
    </Layout>
  )

}

export default GoodsCategory;