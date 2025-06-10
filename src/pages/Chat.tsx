import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { Commu } from "../types/commu";
import CommuCard from "../components/CommuCard";
import styles from './CardListLayout.module.css';
// import commustyles from './CommuList.module.css';
import filterstyles from './filter.module.css';
import morestyles from '../components/MainMoreBtn.module.css';
import MainMoreBtn from "../components/MainMoreBtn";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";


const Chat = () => {



    return (
        <Layout>
            <Header type="type7" />
            <div>
     
            </div>
        </Layout>
    )

}

export default Chat;