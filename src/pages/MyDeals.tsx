import Layout from "../components/Layout";
import { Goods } from "../types";
import filterstyle from './filter.module.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import MyDealItem from "../components/MyDealItem";


const MyDeals = () => {
    //내 상품 관리 리스트 상태 추가
    const [goodsList, setGoodsList] = useState<Goods[]>([]);
    const [filter, setFilter] = useState<string>('전체');

    useEffect(() => {
        fetch('/data/goods.json')
            .then(res => res.json())
            .then(data => setGoodsList(data));
    }, []);

    // sellerName이 '뱃지가좋아'인 아이템만 필터링
    const filteredList = goodsList.filter(item => item.sellerName === '뱃지가좋아');

    return (
        <Layout>
            <Header type='type1' title='내 상품 관리' />
            {filteredList.map(item => (
                <MyDealItem
                    key={item.id}
                    item={item}
                />
            ))}

        </Layout>
    )
}
export default MyDeals;