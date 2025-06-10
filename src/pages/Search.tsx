import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import GoodsCategoryItem from "../components/GoodsCategoryItem";
import { useNavigate } from 'react-router-dom';

const Search = () => {
    return (
        <Layout>
            <Header type="type0"></Header>
            <GoodsCategoryItem idsToShow={["1", "2", "3", "4", "5", "6", "7", "8"]} />
        </Layout>
    )
}
export default Search;