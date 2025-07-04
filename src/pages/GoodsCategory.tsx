import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import MultiTab from "../components/exchangebuy/MultiTab";
import Header from "../components/header/Header";
import styles from '../components/exchangebuy/Tab.module.css';
import { useParams } from "react-router-dom";
import GoodsCard from "../components/GoodsCard";
import { useGoods } from "../context/GoodsContext";
import cardstyle from "../pages/CardListLayout.module.css"

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
  const { goodsList, setGoodsList } = useGoods();
  const category = categories.find(cat => cat.id === id);
  const categoryName = category ? category.name : "";

  // likes 상태 관리
  const [likedIds, setLikedIds] = useState<string[]>([]);

  useEffect(() => {
    const liked = localStorage.getItem('likes');
    if (liked) setLikedIds(JSON.parse(liked));
  }, []);

  // 선택된 카테고리의 goods만 필터
  const filteredGoods = goodsList.filter(g => g.category === categoryName);

  return (
    <Layout>
      <Header type="type1" title={categoryName} ></Header>
      <div className={styles.pageContent}>
        <MultiTab tabs={['구매', '교환']}>
          {(activeIndex) => (
            activeIndex === 0 ? (
              <div className={cardstyle.goodgoodspick} style={{ paddingTop: "var(--space32)" }}>
                {filteredGoods
                  .filter(g => !g.isExchangeable)
                  .slice(0, 8)
                  .map(item => (
                    <GoodsCard
                      key={item.id}
                      item={item}
                      likedIds={likedIds}
                      setLikedIds={setLikedIds}
                      goodsList={goodsList}
                      setGoodsList={setGoodsList}
                    />
                  ))}
              </div>
            ) : activeIndex === 1 ? (
              <div className={cardstyle.goodgoodspick} style={{ paddingTop: "var(--space32)" }}>
                {filteredGoods
                  .filter(g => g.isExchangeable)
                  .slice(0, 8)
                  .map(item => (
                    <GoodsCard
                      key={item.id}
                      item={item}
                      likedIds={likedIds}
                      setLikedIds={setLikedIds}
                      goodsList={goodsList}
                      setGoodsList={setGoodsList}
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