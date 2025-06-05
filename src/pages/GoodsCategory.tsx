import Layout from "../components/Layout";
import DefaultTab from "../components/exchangebuy/DefalutTab";
import Header from "../components/header/Header";
import styles from '../components/exchangebuy/Tab.module.css';

const GoodsCategory = () =>{
    return(
        <Layout>
            <Header type="type1"></Header>
      <div className={styles.pageContent}>
        <DefaultTab />
      </div>
        </Layout>
    )

}

export default GoodsCategory;