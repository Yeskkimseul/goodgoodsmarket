import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import MultiTab from "../components/exchangebuy/MultiTab";

const Liked = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Header type="type1" title="관심목록"/>
        </Layout>
    )
}
export default Liked;