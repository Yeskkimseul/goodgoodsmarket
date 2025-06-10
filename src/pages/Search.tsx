import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import GoodsCategoryItem from "../components/GoodsCategoryItem";
import styles from "./Search.module.css";
import mypageStyles from "./Mypage.module.css";
import ToggleButton from "../components/ToggleButton";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    return (
        <Layout>
            <Header type="type0"></Header>
            <div className={mypageStyles.section}>
                <div className={mypageStyles.title}>
                    인기 카테고리
                </div>{/* //.title */}
            </div>{/* section */}

            <div className={styles.goodsCategory}>
            <GoodsCategoryItem idsToShow={["1", "2", "3", "4", "5"]} />
            </div>

            <div className={mypageStyles.section}>
                <div className={mypageStyles.title}>
                    추천 검색
                </div>{/* //.title */}
                <div className={styles.recommend_wrap}>
                    <div className={styles.recommend}>
                        <ToggleButton text="네오닉스" onSelect={(text, selected) => console.log(text, selected)} />
                        <ToggleButton text="마법쓰는 사무직" onSelect={(text, selected) => console.log(text, selected)} />
                    </div>
                    <div className={styles.recommend}>
                        <ToggleButton text="카라비너" onSelect={(text, selected) => console.log(text, selected)} />
                        <ToggleButton text="아크릴 코롯토" onSelect={(text, selected) => console.log(text, selected)} />
                        <ToggleButton text="포토카드" onSelect={(text, selected) => console.log(text, selected)} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Search;