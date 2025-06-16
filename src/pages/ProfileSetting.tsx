import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/header/Header";
import { useNavigate } from 'react-router-dom';
import Modal from "../components/Modal";

const ProfileSetting = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Header type='type4'/>
 
        </Layout>
    )
}
export default ProfileSetting;