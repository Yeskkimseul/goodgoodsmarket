import Layout from "../components/Layout";
import MultiTab from "../components/exchangebuy/MultiTab";
import Header from "../components/header/Header";
import styles from '../components/exchangebuy/Tab.module.css';
import { useParams } from "react-router-dom";
import GoodsCard from "../components/GoodsCard";
import { useGoods } from "../context/GoodsContext";

const categories = [
  { id: "1", name: "포토카드" },
  { id: "2", name: "인형" },
  { id: "3", name: "아크릴 굿즈" },
  { id: "4", name: "문구류" },
  { id: "5", name: "패션" },
  { id: "6", name: "음반" },
  { id: "7", name: "팬 라이트" },
  { id: "8", name: "잡지" },
  { id: "9", name: "티켓" },
  { id: "10", name: "팬 메이드" },
  { id: "11", name: "기타" }
];

const GoodsCategory = () => {
  const { id } = useParams<{ id: string }>();
  const { goodsList } = useGoods();
  const category = categories.find(cat => cat.id === id);
  const categoryName = category ? category.name : "";

  // 선택된 카테고리의 goods만 필터
  const filteredGoods = goodsList.filter(g => g.category === categoryName);

  return (
    <Layout>
      <Header type="type1" title={categoryName} ></Header>
      <div className={styles.pageContent}>
        <MultiTab tabs={['구매', '교환']}>
          {(activeIndex) => (
            activeIndex === 0 ? (
              <div>
                {filteredGoods
                  .filter(g => !g.isExchangeable)
                  .map(item => (
                    <GoodsCard
                      key={item.id}
                      item={item}
                      likedIds={[]} // 필요시 Home처럼 상태 관리
                      setLikedIds={() => { }}
                      goodsList={goodsList}
                      setGoodsList={() => { }}
                    />
                  ))}
              </div>
            ) : activeIndex === 1 ? (
              <div>
                {filteredGoods
                  .filter(g => g.isExchangeable)
                  .map(item => (
                    <GoodsCard
                      key={item.id}
                      item={item}
                      likedIds={[]}
                      setLikedIds={() => { }}
                      goodsList={goodsList}
                      setGoodsList={() => { }}
                    />
                  ))}
              </div>
            ) : null
          )}
        </MultiTab>
      </div>
    </Layout>
  )

}

export default GoodsCategory;