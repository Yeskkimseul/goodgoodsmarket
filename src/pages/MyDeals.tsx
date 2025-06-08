import Layout from "../components/Layout";
import { Goods } from "../types";
import filterstyle from './filter.module.css'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import MyDealItem from "../components/MyDealItem";


const filterList = [
    {label:'전체', value:'전체'},
    {label: '판매중', value: '판매중'},
    {label: '교환중',value:'교환중'},
];

const MyDeals = () => {
    //내 상품 관리 리스트 상태 추가
    const [goodsList, setGoodsList] = useState<Goods[]>([]);
    const [filter, setFilter] = useState<string>('전체');

    useEffect(() => {
        fetch('/data/goods.json')
            .then(res => res.json())
            .then(data => setGoodsList(data));
    }, []);

    // sellerName이 '뱃지가좋아'인 아이템만 필터링 후, 추가 필터 적용
    const filteredList = goodsList
        .filter(item => item.sellerName === '뱃지가좋아')
        .filter(item => {
            if (filter === '판매중') return !item.isExchangeable;
            if (filter === '교환중') return item.isExchangeable;
            return true; // 전체
        });

    return (
        <Layout>
            <Header type='type1' title='내 상품 관리' />
            <div className={filterstyle.filterContainer}>
                {filterList.map (f => (
                    <button
                        className={`${filterstyle.filterButton} ${filter === f.value ? filterstyle.active : ''}`}
                        key={f.value}
                        onClick={()=> setFilter(f.value)}>
                            {f.label}
                        </button>
                ))}
            </div>
            {filteredList.map(item => (
                <MyDealItem
                    key={item.id}
                    item={item}
                    setGoodsList={setGoodsList}
                />
            ))}

        </Layout>
    )
}
export default MyDeals;