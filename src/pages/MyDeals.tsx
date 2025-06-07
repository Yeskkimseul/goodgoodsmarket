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
    const [filter,setFilter] = useState<string>('전체');
    
    return (
        <Layout>
            <Header type='type1' title='내 상품 관리' />
           <MyDealItem />
            
        </Layout>
    )
}
export default MyDeals;