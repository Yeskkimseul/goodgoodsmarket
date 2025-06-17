import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';

const Transactional = () => {
    return (
        <Layout>
            <Header type="type1" title="거래내역"/>
 
        </Layout>
    )
}
export default Transactional;