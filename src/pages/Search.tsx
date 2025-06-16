import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import GoodsCategoryItem from "../components/GoodsCategoryItem";
import styles from "./Search.module.css";
import mypageStyles from "./Mypage.module.css";
import ToggleButton from "../components/ToggleButton";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [selectedKeyword, setSelectedKeyword] = useState("");

    const handleToggle = (text: string, selected: boolean) => {
        if (selected) {
            setSearchValue(text);
            setSelectedKeyword(text); // 현재 선택된 키워드 기억
        } else {
            setSearchValue(""); // 해제 시 input 비움
            setSelectedKeyword(""); // 선택 해제
        }
    };

    const isSelected = (text: string) => selectedKeyword === text;

    return (
        <Layout>
            <Header type="type0" searchValue={searchValue} setSearchValue={setSearchValue} />
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
                        <ToggleButton text="네오닉스" selected={isSelected("네오닉스")}
                            onSelect={handleToggle} />
                        <ToggleButton text="마법쓰는 사무직" selected={isSelected("마법쓰는 사무직")}
                            onSelect={handleToggle} />
                    </div>
                    <div className={styles.recommend}>
                        <ToggleButton text="카라비너" selected={isSelected("카라비너")}
                            onSelect={handleToggle} />
                        <ToggleButton text="아크릴 코롯토" selected={isSelected("아크릴 코롯토")}
                            onSelect={handleToggle} />
                        <ToggleButton text="포토카드" selected={isSelected("포토카드")}
                            onSelect={handleToggle} />
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default Search;