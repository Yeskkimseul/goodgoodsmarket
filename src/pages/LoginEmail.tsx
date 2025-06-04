import React from 'react';
import Layout from "../components/Layout";
import styles from '../pages/Login.module.css'
import { Link } from 'react-router-dom';


const LoginEmail = () => {


    return (
        <Layout>

            <div className={styles.title}>
                <img src="/images/login/logoimg_small.svg" alt="logo" />
                <h1>이메일로 로그인하기</h1>
            </div>


        </Layout>
    )
}
export default LoginEmail;