import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import MultiTab from "../components/exchangebuy/MultiTab";
import { useNavigate } from 'react-router-dom';
import TransactionalList from "../components/TransactionalList";

const Transactional = () => {
    return (
        <Layout>
            <Header type="type1" title="거래내역" />
            <MultiTab
                tabs={['구매내역', '판매내역', '교환내역']}
            >
                {(activeIndex) => (
                    activeIndex === 0 ? (
                        <div>
                            <TransactionalList
                                status="거래완료"
                                image="../images/mydeals/sale1.png"
                                title="귀여운 인형"
                                price={15000}
                                date="2025.06.17"
                                button
                            />
                        </div>
                    ) : activeIndex === 1 ? (
                        <div>

                        </div>
                    ) : activeIndex === 2 ? (
                        <div>

                        </div>
                    ) : null
                )}
            </MultiTab>
        </Layout>
    )
}
export default Transactional;