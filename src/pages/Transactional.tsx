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
                                image="../images/transactional/1-1.png"
                                title="수국공주수수 피규어"
                                price={97000}
                                date="25.05.17"
                                button
                            />
                            <TransactionalList
                                status="거래완료"
                                image="../images/transactional/1-2.png"
                                title="요술탐정 쥬로링 거울키링"
                                price={15000}
                                date="25.05.04"
                                button
                            />
                            <TransactionalList
                                status="거래완료"
                                image="../images/transactional/1-3.jpg"
                                title="한정 복각미미"
                                price={39000}
                                date="25.04.29"
                                button
                            />
                            <TransactionalList
                                status="거래완료"
                                image="../images/transactional/1-4.png"
                                title="이세계 전학 굿즈 세트"
                                price={55000}
                                date="25.04.02"
                                button
                            />
                            <TransactionalList
                                status="거래완료"
                                image="../images/transactional/1-5.png"
                                title="마법쓰는 사무직 굿즈"
                                price={45000}
                                date="25.01.29"
                                button
                            />
                        </div>
                    ) : activeIndex === 1 ? (
                        <div>
                            <TransactionalList
                                status="판매완료"
                                image="../images/transactional/2-1.png"
                                title="분홍키링 세트로 팔아요"
                                price={15000}
                                date="25.06.27"
                            />
                            <TransactionalList
                                status="판매완료"
                                image="../images/transactional/2-3.jpg"
                                title="레인보우하이 다프네"
                                price={50000}
                                date="25.04.10"
                            />
                            <TransactionalList
                                status="판매완료"
                                image="../images/transactional/2-4.jpg"
                                title="루나써니 트윈팩"
                                price={120000}
                                date="25.03.22"
                            />
                            <TransactionalList
                                status="판매완료"
                                image="../images/transactional/2-5.png"
                                title="물방울소녀 가챠"
                                price={5000}
                                date="25.02.08"
                            />
                        </div>
                    ) : activeIndex === 2 ? (
                        <div>
                            <TransactionalList
                                status="교환완료"
                                image="../images/transactional/3-1.png"
                                title="핑크잡이 도와주세요ㅠㅠ 그린으로 교환희망"
                                price={'교환 희망 제품'}
                                date="25.05.30"
                            />
                            <TransactionalList
                                status="교환완료"
                                image="../images/transactional/3-3.png"
                                title="소꿉친구 히로인 키링 교환"
                                price={'교환 희망 제품'}
                                date="25.04.06"
                            />
                            <TransactionalList
                                status="교환완료"
                                image="../images/transactional/3-2.png"
                                title="마법소녀라라 포카교환 솔솔로"
                                price={'교환 희망 제품'}
                                date="25.05.18"
                            />
                            <TransactionalList
                                status="교환완료"
                                image="../images/transactional/3-4.png"
                                title="은퇴용사키링 교환 구해요ㅠㅠ"
                                price={'교환 희망 제품'}
                                date="25.03.19"
                            />
                            <TransactionalList
                                status="교환완료"
                                image="../images/transactional/3-5.png"
                                title="물방울소녀키링 d상으로 교환"
                                price={'교환 희망 제품'}
                                date="25.03.05"
                            />
                        </div>
                    ) : null
                )}
            </MultiTab>
        </Layout>
    )
}
export default Transactional;